import { SSEListenerParams } from './FetchEventSourceClient'

export const messageEvent = (event?: SSEListenerParams, cb?: (data: string) => void): void => {
  const data = event?.data
  if (data && typeof data === 'object') {
    const message = data.message
    if (message && typeof message === 'string') {
      cb?.(message)
    }
  }
}
