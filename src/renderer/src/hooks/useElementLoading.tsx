import { useState, useRef, useCallback, useEffect } from 'react'
import { createRoot, Root } from 'react-dom/client'
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
  containerStyle: CSSStyleDeclaration | null = null,
  spinProps?: SpinProps
): UseElementLoadingReturn => {
  const [loading, setLoading] = useState(false)
  const rootRef = useRef<Root | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const originalPositionRef = useRef<string>('')

  const startLoading = useCallback(() => {
    setLoading(true)
  }, [])

  const stopLoading = useCallback(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!loading) return

    const targetElement = document.querySelector(selector) as HTMLElement
    if (!targetElement) {
      console.warn(`useElementLoading: Element with selector "${selector}" not found.`)
      return
    }

    // 存储原始定位方式，如果是 static 则设置为 relative
    const computedStyle = window.getComputedStyle(targetElement)
    originalPositionRef.current = targetElement.style.position
    if (computedStyle.position === 'static') {
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
    containerRef.current = container

    // 渲染 Spin 组件
    const root = createRoot(container)
    root.render(<Spin {...spinProps} />)
    rootRef.current = root

    // 清理函数
    return () => {
      if (rootRef.current) {
        rootRef.current.unmount()
        rootRef.current = null
      }
      if (containerRef.current && containerRef.current.parentNode) {
        containerRef.current.parentNode.removeChild(containerRef.current)
        containerRef.current = null
      }
      // 恢复原始定位方式
      if (targetElement) {
        targetElement.style.position = originalPositionRef.current
      }
    }
  }, [loading, selector, spinProps])

  return { loading, startLoading, stopLoading }
}
