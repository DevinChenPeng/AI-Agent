# API 与 HTTP 客户端（API & HTTP）

## 类型与返回值

- 类型定义：`src/renderer/src/types/common.ts`（示例 `HttpResponse<T>`）
- HTTP 封装：`src/renderer/src/utils/http/index.ts`

## HTTP 封装（Axios）

- 统一的 `Http` 类，内置请求/响应拦截、转换、状态校验
- 常用方法：`get<T>`, `post<T>`, `put<T>`, `delete<T>`

### 使用示例

```ts
import http from '@renderer/utils/http'
import type { HttpResponse } from '@renderer/types/common'

export const getUserInfo = (): HttpResponse<{ data: Record<string, unknown> }> => http.get('/api/user')
```

## 请求/响应转换

- JSON 与表单类型自动转换
- 响应尝试 JSON.parse（字符串时）
- `validateStatus` 保持默认 2xx

> 可在 `BASE_CONFIG` 中集中配置 `baseURL`、`timeout`、默认请求头等。
