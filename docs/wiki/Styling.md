# 样式系统与设计规范（Styling）

## CSS 变量（`styles/css/variables.css`）

- 主题色、辅助色、中性色、背景、边框、阴影、圆角、间距、字体、行高、动画、层级、容器宽度等统一在 `:root` 定义。
- 已将以下维度统一改为 `rem`：
  - 间距（`--spacing-*`）如 `4px → 0.4rem`（基于 1rem = 10px）
  - 圆角（`--radius-*`）如 `2px → 0.2rem`
  - 阴影（`--shadow-*`）内的长度，如 `0 2px 4px → 0 0.2rem 0.4rem`
- 如需整体缩放，只需调整根字号（建议 `html { font-size: 62.5%; }`）

## 工具类（`styles/css/layout.css`、`styles/css/utilities.css`）

- Flex/Grid 布局与对齐：`flex`, `flex-row`, `justify-center`, `items-center`, `grid`, `grid-cols-3` 等
- 间距：`gap-xs`, `gap-sm`, `gap-md`...
- 定位与显示：`relative`, `absolute`, `block`, `hidden`...
- 其它：`cursor-pointer`, `z-modal`, `sr-only`, `gpu-accelerated`, `smooth-scroll`...

## 使用示例

```tsx
<div className="fcc gap-md">
  <button className="cursor-pointer">OK</button>
</div>
```

> 注：也可以结合 `cn()` 动态拼接工具类：`cn('fcc', isActive && 'cursor-pointer')`
