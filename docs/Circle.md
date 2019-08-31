## Circle `v1.2.0+`

### Examples

- 基本用法

  ```tsx
  import {
    RCMap,
    Theme,
    TileLayer,
    Circle,
    Popup,
    Tooltip
  } from 'rc-leaflet'

  (
    <RCMap crs center>
      <TileLayer />
      <Circle center radius />
    </RCMap>
  )
  ```

- 统一设置`Path`样式

  ```tsx
  const theme = {
    path: {
      color: '#ff0000',
      opacity: 0.5
    }
  }

  (
    <Theme value={theme}>
      <RCMap crs center>
        <TileLayer />
        <Circle />
        <Circle color /> {/* 覆盖统一样式 */}
      </RCMap>
    </Theme>
  )
  ```

- 设置`DivOverlay`

  ```tsx
  (
    <Circle center radius>
      <Popup />
      <Tooltip />
    </Circle>
  )
  ```

### Props

- center

  - type: `L.LatLngExpression`

  - required: `true`

  - 圆的中心坐标

- radius

  - type: `number`

  - required: `true`

  - 圆的中心半径, 单位米

### 继承自`Path`的`Props`

- stroke

  - type: `boolean`

  - required: `false`

  - `Circle`是否描边

- color

  - type: `string`

  - required: `false`

  - `Circle`边的颜色

- opacity

  - type: `number`

  - required: `false`

  - `Circle`的透明度

- lineCap

  - type: `'butt' | 'round' | 'square' | 'inherit'`

  - required: `false`

  - 在`Circle`有描边的情况下设置描边两端的形状

- lineJoin

  - type: `'miter' | 'round' | 'bevel' | 'inherit'`

  - required: `false`

  - 在`Circle`有描边的情况下设置描边拐角处的形状

- dashArray

  - type: `string | number[]`

  - required: `false`

  - 在`Circle`有描边的情况下设置描边段落样式

- dashOffset

  - type: `string`

  - required: `false`

  - 在`Circle`有描边的情况下设置描边段落偏移量

- fill

  - type: `boolean`

  - required: `false`

  - `Circle`是否填充颜色

- fillColor

  - type: `string`

  - required: `false`

  - 设置`Circle`填充颜色

- fillOpacity

  - type: `number`

  - required: `false`

  - 设置`Circle`填充透明度

- fillRule

  - type: `'nonzero' | 'evenodd' | 'inherit'`

  - required: `false`

  - 设置`Circle`填充规则

- renderer

  - type: `L.Renderer`

  - required: `false`

  - 设置`Circle`的渲染底层, 分`SVG`或`Canvas`

- className

  - tpye: `string`

  - required: `false`

  - 设置`Circle`的类名

### 继承自`InteractiveLayer`的`Props`

- interactive

  - type: `boolean`

  - required: `false`

  - `Circle`是否具有交互效果

- bubblingMouseEvents

  - type: `boolean`

  - required: `false`

  - `Circle`的鼠标事件是否冒泡

### 继承自`Layer`的`Props`

- pane

  - type: `string`

  - required: `false`

  - default: `overlayPane`

  - 放置`Circle`的地图图层名称

- attribution

  - type: `string`

  - required: `false`

  - 版权描述

- onCreate

  - type: `(layer: L.Layer) => void`

  - required: `false`

  - `Circle`创建之后的回调

- onAdd

  - type: `(e: L.LeafletEvent, layer: L.Layer) => void`

  - required: `false`

  - `Circle`添加到图层之后的回调

- onUpdate

  - type: `(layer: L.Layer) => void`

  - required: `false`

  - `Circle`发生更新之后的回调

- onBeforeRemove

  - type: `(layer: L.Layer) => void`

  - required: `false`

  - `Circle`在删除之前的回调

- onRemove

  - type: `(e: L.LeafletEvent, layer: L.Layer) => void`

  - required: `false`

  - `Circle`删除时的回调

### 继承自`Evented`的`Props`

- onClick

  - type: `(e: L.LeafletMouseEvent) => void`

  - required: `false`

  - `Circle`鼠标点击时的回调

- onMouseOver

  - type: `(e: L.LeafletMouseEvent) => void`

  - required: `false`

  - `Circle`鼠标进入时的回调

- onMouseOut

  - type: `(e: L.LeafletMouseEvent) => void`

  - required: `false`

  - `Circle`鼠标离开时的回调
