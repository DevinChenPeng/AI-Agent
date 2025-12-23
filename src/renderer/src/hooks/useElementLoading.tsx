import { useState, useRef, useCallback, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Spin, SpinProps } from 'antd'

interface UseElementLoadingReturn {
  loading: boolean
  startLoading: () => void
  stopLoading: () => void
}

/**
 * 在指定元素上显示加载动画的 Hook。
 * @param selector 要附加加载动画的元素的 CSS 选择器。
 * @param spinProps Ant Design Spin 组件的属性。
 * @returns 包含加载状态、开始和停止函数的对象。
 */
export const useElementLoading = (
  selector: string,
  containerStyle: Partial<CSSStyleDeclaration> | null = null,
  spinProps?: SpinProps
): UseElementLoadingReturn => {
  const [loading, setLoading] = useState(false)
  const cleanupTokenRef = useRef<symbol | null>(null)

  const startLoading = useCallback(() => {
    setLoading(true)
  }, [])

  const stopLoading = useCallback(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!loading) return

    const targetElement = document.querySelector(selector) as HTMLElement | null
    if (!targetElement) {
      console.warn(`useElementLoading: Element with selector "${selector}" not found.`)
      return
    }

    const effectToken = Symbol('element-loading')
    cleanupTokenRef.current = effectToken

    // 存储原始定位方式，如果是 static 则设置为 relative
    const computedStyle = window.getComputedStyle(targetElement)
    const originalPosition = targetElement.style.position
    const shouldRestorePosition = computedStyle.position === 'static'
    if (shouldRestorePosition) {
      targetElement.style.position = 'relative'
    }

    // 创建加载动画的容器
    const container = document.createElement('div')
    container.style.position = 'absolute'
    container.style.top = '0'
    container.style.left = '0'
    container.style.width = '100%'
    container.style.height = '100%'
    container.style.zIndex = '9999'
    container.style.display = 'flex'
    container.style.justifyContent = 'center'
    container.style.alignItems = 'center'
    container.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'
    container.style.borderRadius = computedStyle.borderRadius // 匹配圆角
    if (containerStyle) {
      Object.assign(container.style, containerStyle)
    }
    targetElement.appendChild(container)

    // 渲染 Spin 组件
    const root = createRoot(container)
    root.render(<Spin {...spinProps} />)

    // 清理函数
    /**
     * 返回一个清理函数，用于卸载React根组件并清理DOM容器
     * 该函数使用微任务队列来延迟执行清理操作，确保在当前渲染周期结束后执行
     * @returns 无返回值的清理函数
     */
    return () => {
      // 根据浏览器支持情况选择合适的微任务调度方式
      // 优先使用queueMicrotask，降级使用Promise.then
      const schedule: (callback: VoidFunction) => void =
        typeof queueMicrotask === 'function'
          ? queueMicrotask
          : (cb: VoidFunction) => {
              Promise.resolve().then(cb)
            }

      // 将清理操作调度到微任务队列中执行
      schedule(() => {
        root.unmount()
        if (container.parentNode) {
          container.parentNode.removeChild(container)
        }
        if (cleanupTokenRef.current === effectToken) {
          cleanupTokenRef.current = null
          if (shouldRestorePosition) {
            targetElement.style.position = originalPosition
          }
        }
      })
    }
  }, [loading, selector, containerStyle, spinProps])

  return { loading, startLoading, stopLoading }
}
