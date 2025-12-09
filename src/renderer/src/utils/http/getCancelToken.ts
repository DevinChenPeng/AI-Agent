import axios, { CancelToken, Canceler } from 'axios'

interface CancelTokenManager {
  cancelToken: () => CancelToken
  cancelQuest: () => void
  source: Canceler | undefined
}

const getCancelToken = (): CancelTokenManager => {
  let source: Canceler | undefined //存放取消的请求方法
  const cancelQuest = (): void => {
    if (typeof source === 'function') {
      source?.('终止请求') //取消请求
    }
  }
  const cancelToken = (): CancelToken =>
    new axios.CancelToken(function executor(c) {
      source = c
    })

  return {
    cancelToken,
    cancelQuest,
    source
  }
}

export default getCancelToken
