import { SSEListenerParams, SSEOptions } from './FetchEventSourceClient'

export const createSseConfig = (message: string): SSEOptions => ({
  method: 'POST',
  data: {
    text: message
  }
})

export const messageEvent = (event?: SSEListenerParams, cb?: (data: string) => void): void => {
  const data = event?.data
  if (data && typeof data === 'object') {
    const message = data.message
    if (message && typeof message === 'string') {
      cb?.(message)
    }
  }
}

export const endEvent = (cb?: () => void): void => {
  cb?.()
}

export const startEvent = (event?: SSEListenerParams, cb?: (id: string) => void): void => {
  const id = event?.id
  if (id && typeof id === 'string') {
    cb?.(id)
  }
}
