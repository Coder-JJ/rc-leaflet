## Rectangle

### Examples

- Basic Usage

  ```tsx
  import {
    RCMap,
    Theme,
    TileLayer,
    Rectangle,
    Popup,
    Tooltip
  } from 'rc-leaflet'

  (
    <RCMap crs center>
      <TileLayer />
      <Rectangle bounds />
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
        <Rectangle />
        <Rectangle bounds /> {/* 覆盖统一样式 */}
      </RCMap>
    </Theme>
  )
  ```

- 设置`DivOverlay`

  ```tsx
  (
    <Rectangle bounds>
      <Popup />
      <Tooltip />
    </Rectangle>
  )
  ```

### Props

- bounds

  - type: `L.LatLngBoundsExpression`

  - required: `true`

  - 矩形的视窗

### `Props` inherited from `Polyline`

- smoothFactor

  - type: `number`

  - required: `false`

  - 矩形的平滑程度, 越大意味着更好的性能和更平滑的外观, 越小意味着更精准

- noClip

  - type: `boolean`

  - required: `false`

  - 是否不裁剪矩形

### `Props` inherited from `Path`

- stroke

  - type: `boolean`

  - required: `false`

  - `Rectangle`是否描边

- color

  - type: `string`

  - required: `false`

  - `Rectangle`边的颜色

- opacity

  - type: `number`

  - required: `false`

  - `Rectangle`的透明度

- lineCap

  - type: `'butt' | 'round' | 'square' | 'inherit'`

  - required: `false`

  - 在`Rectangle`有描边的情况下设置描边两端的形状

- lineJoin

  - type: `'miter' | 'round' | 'bevel' | 'inherit'`

  - required: `false`

  - 在`Rectangle`有描边的情况下设置描边拐角处的形状

- dashArray

  - type: `string | number[]`

  - required: `false`

  - 在`Rectangle`有描边的情况下设置描边段落样式

- dashOffset

  - type: `string`

  - required: `false`

  - 在`Rectangle`有描边的情况下设置描边段落偏移量

- fill

  - type: `boolean`

  - required: `false`

  - `Rectangle`是否填充颜色

- fillColor

  - type: `string`

  - required: `false`

  - 设置`Rectangle`填充颜色

- fillOpacity

  - type: `number`

  - required: `false`

  - 设置`Rectangle`填充透明度

- fillRule

  - type: `'nonzero' | 'evenodd' | 'inherit'`

  - required: `false`

  - 设置`Rectangle`填充规则

- renderer

  - type: `L.Renderer`

  - required: `false`

  - 设置`Rectangle`的渲染底层, 分`SVG`或`Canvas`

- className

  - tpye: `string`

  - required: `false`

  - 设置`Rectangle`的类名

### `Props` inherited from `InteractiveLayer`

- interactive

  - type: `boolean`

  - required: `false`

  - `Rectangle`是否具有交互效果

- bubblingMouseEvents

  - type: `boolean`

  - required: `false`

  - `Rectangle`的鼠标事件是否冒泡

### `Props` inherited from `Layer`

- pane

  - type: `string`

  - required: `false`

  - default: `overlayPane`

  - 放置`Rectangle`的地图图层名称

- attribution

  - type: `string`

  - required: `false`

  - 版权描述

- onCreate

  - type: `(layer: L.Layer) => void`

  - required: `false`

  - `Rectangle`创建之后的回调

- onAdd

  - type: `(e: L.LeafletEvent, layer: L.Layer) => void`

  - required: `false`

  - `Rectangle`添加到图层之后的回调

- onUpdate

  - type: `(layer: L.Layer) => void`

  - required: `false`

  - `Rectangle`发生更新之后的回调

- onBeforeRemove

  - type: `(layer: L.Layer) => void`

  - required: `false`

  - `Rectangle`在删除之前的回调

- onRemove

  - type: `(e: L.LeafletEvent, layer: L.Layer) => void`

  - required: `false`

  - `Rectangle`删除时的回调

### `Props` inherited from `Evented`

- onClick

  - type: `(e: L.LeafletMouseEvent) => void`

  - required: `false`

  - `Rectangle`鼠标点击时的回调

- onMouseOver

  - type: `(e: L.LeafletMouseEvent) => void`

  - required: `false`

  - `Rectangle`鼠标进入时的回调

- onMouseOut

  - type: `(e: L.LeafletMouseEvent) => void`

  - required: `false`

  - `Rectangle`鼠标离开时的回调
