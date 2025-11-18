/**
 * 说明：
 * 本文件提供与 Server-Sent Events (SSE) 相关的低层解析工具，
 * 负责将通过 fetch 返回的 ReadableStream<Uint8Array> 按“行”进行处理。
 *
 * 你可以使用：
 *  - parseEventStreamLineByLine：逐块读取字节流，把每个 chunk 交由回调处理；
 *  - handleLines：返回一个闭包 onChunk，用于在回调中把跨 chunk 的字节缓冲拼接，并找出完整的“行”。
 *
 * 注意：
 *  - chunk 边界与“行”边界通常不对齐；
 *  - SSE 允许使用 LF("\n") 或 CRLF("\r\n") 作为行结束符；
 *  - 本模块不直接把“行”组装成最终事件对象，留给上层按 WHATWG 规范去解释字段与数据。
 */
export interface EventSourceMessage {
  // 事件ID
  id: string
  // 事件类型
  event: string
  // 事件负载数据（SSE 允许 data 出现多行，上层通常会用 "\n" 连接）
  data: string
  // 服务器建议的重试间隔（毫秒），可选
  retry?: number
  // 可选的扩展字段：部分实现可能附带 size 信息，非标准
  size?: string
}

/**
 * 创建一条空的 SSE 消息占位对象。
 * 按 WHATWG 规范，data/event/id 需要初始化为空字符串；retry 初始化为 undefined，
 * 这样可以保持对象形状稳定（shape stable），有利于热点路径优化。
 * 参考：
 *  - https://html.spec.whatwg.org/multipage/server-sent-events.html#event-stream-interpretation
 *  - https://mathiasbynens.be/notes/shapes-ics#takeaways
 */
function newMessage(): EventSourceMessage {
  return {
    data: '',
    event: '',
    id: '',
    retry: undefined
  }
}

/**
 * 逐块读取 ReadableStream（字节流），并在每个 chunk 到达时触发回调。
 * 注意：本函数不拆分行也不解码字节，仅负责把到达的 chunk 原样交给回调。
 *
 * 参数说明：
 *  - stream: 来自 fetch(Response.body) 的字节流
 *  - onChunk: 每个 chunk 到达时的回调（未解码，Uint8Array）
 *
 * 典型用法：
 *  const onChunk = handleLines() // 返回逐行解析的闭包
 *  await parseEventStreamLineByLine(response.body!, onChunk)
 */
export async function parseEventStreamLineByLine(
  stream: ReadableStream<Uint8Array>,
  onChunk: (chunk: Uint8Array) => void
): Promise<void> {
  const reader = stream.getReader()
  let result: ReadableStreamReadResult<Uint8Array>

  while (!(result = await reader.read()).done) {
    const chunk = result.value
    onChunk(chunk)
  }
}
/**
 * 常用控制字符（按 ASCII 值）。
 *  - NewLine = 10：LF 换行，字符是 '\n'，十六进制 0x0A，Unicode U+000A
 *  - CarriageReturn = 13：CR 回车，字符是 '\r'，十六进制 0x0D，Unicode U+000D
 *  - Space = 32：空格，字符是 ' '，十六进制 0x20，Unicode U+0020
 *  - Colon = 58：冒号，字符是 ':'，十六进制 0x3A，Unicode U+003A
 */
const enum ControlChars {
  NewLine = 10,
  CarriageReturn = 13,
  Space = 32,
  Colon = 58
}
/**
 * 返回一个闭包 onChunk，用于将跨 chunk 的字节流拼接，并不断找出完整“行”。
 *
 * 解析要点：
 *  - 处理 CRLF：遇到 '\r' 时设置标记，在下一字节若为 '\n' 则跳过该换行符；
 *  - fieldLength：记录本行中“字段名”的长度（位于 ':' 之前）。若未出现 ':' 则保持为 -1；
 *  - 未完行：若当前 chunk 结尾仍未找到换行符，则保留缓冲区并等待下个 chunk 补全；
 *  - 上层集成：可在找到 line 后使用 TextDecoder 解码，并按 SSE 规范进一步组装事件。
 */
export const handleLines = (onLine: (line: Uint8Array, fieldLength: number) => void) => {
  let buffer: Uint8Array | undefined
  let position: number // 当前处理位置（buffer 中的读指针）
  let fieldLength: number // 行的“字段名”部分的长度（若未遇到 ':' 则为 -1）
  let discardTrailingNewline = false // 是否丢弃紧随其后的 '\n'（用于处理 CRLF）
  return function onChunk(chunk: Uint8Array): void {
    if (buffer === undefined) {
      buffer = chunk
      position = 0
      fieldLength = -1
    } else {
      // 合并上次遗留的未处理数据与本次 chunk
      buffer = concat(buffer, chunk)
    }
    const bufLength = buffer.length
    let lineStart = 0 // 当前行的起始位置
    // 循环处理 buffer 中的每个字节
    while (position < bufLength) {
      if (discardTrailingNewline) {
        if (buffer[position] === ControlChars.NewLine) {
          lineStart = ++position // 跳过换行符
        }

        discardTrailingNewline = false
      }
      // 查找行结束位置
      let lineEnd = -1
      for (; position < bufLength && lineEnd === -1; ++position) {
        switch (buffer[position]) {
          case ControlChars.Colon:
            if (fieldLength === -1) {
              // 记录字段部分长度
              fieldLength = position - lineStart
            }
            // 继续查找行结束
            break
          case ControlChars.CarriageReturn:
            discardTrailingNewline = true
          // eslint-disable-next-line no-fallthrough
          case ControlChars.NewLine:
            lineEnd = position
            // 找到行结束
            break
        }
      }
      if (lineEnd === -1) {
        // 我们到达了缓冲区的尽头，但队伍还没有结束。
        // 等待下一个数据块，然后继续解析：
        break
      }
      // 我们已经到达线路尽头，发送：
      // 注意：当前行的字节范围为 buffer.subarray(lineStart, lineEnd)。
      // 若需要文本请使用 TextDecoder 解码；上层可依据 fieldLength 将其拆分为 field 与 value：
      //  - 若 fieldLength === -1，则本行可能是空行（事件分隔）或注释（以 ':' 开头）；
      //  - 若存在 ':'，则 field = buffer.subarray(lineStart, lineStart + fieldLength)
      //                    value = 去掉可选的前导空格后 buffer.subarray(lineStart + fieldLength + 1, lineEnd)
      onLine(buffer.subarray(lineStart, lineEnd), fieldLength)
      // 开始新的一行
      lineStart = position
      fieldLength = -1
    }
    if (lineStart === bufLength) {
      buffer = undefined // we've finished reading it
    } else if (lineStart !== 0) {
      // Create a new view into buffer beginning at lineStart so we don't
      // need to copy over the previous lines when we get the new arr:
      buffer = buffer.subarray(lineStart)
      position -= lineStart
    }
  }
}
/**
 * 连接两个 Uint8Array，返回新的连续缓冲区。
 * 为减少复制，仅在确有残留待处理数据时才需要调用。
 */
function concat(a: Uint8Array, b: Uint8Array): Uint8Array {
  const res = new Uint8Array(a.length + b.length)
  res.set(a)
  res.set(b, a.length)
  return res
}

/**
 * 获取消息解析器函数
 * @param onId - 当接收到消息ID时的回调函数
 * @param onRetry - 当接收到重试时间设置时的回调函数
 * @param onMessage - 当接收到完整消息时的可选回调函数
 * @returns 返回一个用于处理文本行的函数，该函数负责解析SSE协议格式的数据行
 */
export function getMessages(
  onId: (id: string) => void,
  onRetry: (retry: number) => void,
  onMessage?: (msg: EventSourceMessage) => void
) {
  let message = newMessage()
  const decoder = new TextDecoder('utf-8')

  /**
   * 处理单行数据的函数
   * 根据SSE(Server-Sent Events)协议规范解析每行数据，并组装成完整的消息
   * @param lineBuffer - 包含整行数据的字节数组
   * @param fieldLength - 字段名的长度
   */
  return function onLine(lineBuffer: Uint8Array, fieldLength: number): void {
    // 处理空行情况，表示一个完整消息的结束
    if (lineBuffer.length === 0) {
      message.id && onMessage?.(message)
      message = newMessage()
    } else if (fieldLength && fieldLength > 0) {
      // 解析字段名
      const field = decoder.decode(lineBuffer.subarray(0, fieldLength))
      // 计算字段值的偏移量，处理可能存在的空格分隔符
      const valueOffset = fieldLength + (lineBuffer[fieldLength + 1] === ControlChars.Space ? 2 : 1)
      const value = decoder.decode(lineBuffer.subarray(valueOffset))

      // 根据不同的SSE字段类型进行相应的处理
      switch (field) {
        case 'data':
          message.data = message.data ? message.data + '\n' + value : value // otherwise,
          break
        case 'event':
          message.event = value
          break
        case 'id':
          onId((message.id = value))
          break
        case 'retry': {
          const retry = parseInt(value, 10)
          if (!isNaN(retry)) {
            onRetry((message.retry = retry))
          }
          break
        }
      }
    }
    // 这里可以按 WHATWG SSE 规范解析 line 并组装消息
  }
}
