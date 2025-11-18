// utils/classNames.ts
export type ClassValue = string | number | null | undefined | false | ClassValue[] | Record<string, boolean>

export function cn(...values: ClassValue[]): string {
  const result: string[] = []

  const push = (val: ClassValue): void => {
    if (!val) return
    if (Array.isArray(val)) {
      val.forEach(push)
    } else if (typeof val === 'object') {
      Object.entries(val).forEach(([k, v]) => v && result.push(k))
    } else {
      result.push(String(val))
    }
  }

  values.forEach(push)
  return Array.from(new Set(result)).join(' ') // 去重可选
}
