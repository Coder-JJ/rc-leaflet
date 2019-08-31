## SVGOverlay `v1.3.0+`

### Examples

- 基本用法

  ```tsx
  import {
    RCMap,
    TileLayer,
    SVGOverlay,
    Popup,
    Tooltip
  } from 'rc-leaflet'

  (
    <RCMap crs center>
      <TileLayer />
      <SVGOverlay bounds>
        <SVGOverlay.Content>
          <path />
          <line />
          <circle />
        </SVGOverlay.Content>
      </SVGOverlay>
    </RCMap>
  )
  ```

- 设置`DivOverlay`

  ```tsx
  // interactive必须设置
  (
    <SVGOverlay bounds interactive>
      <Popup />
      <Tooltip />
    </SVGOverlay>
  )
  ```

### 继承自`ImageOverlay`的`Props`

- bounds

  - type: `L.LatLngBoundsExpression`

  - required: `true`

  - `SVGOverlay`的视窗

- opacity

  - type: `number`

  - required: `false`

  - `SVGOverlay`的透明度

- alt

  - type: `string`

  - required: `false`

  - `svg`标签的`alt`属性

- crossOrigin

  - type: `boolean | string`

  - required: `false`

  - `svg`标签的`crossorigin`属性

- errorOverlayUrl

  - type: `string`

  - required: `false`

  - `SVGOverlay`加载失败时显示的`url`

- zIndex

  - type: `number`

  - required: `false`

  - 设置`SVGOverlay`的`z-index`

- className

  - tpye: `string`

  - required: `false`

  - 设置`SVGOverlay`的类名

- onLoad

  - type: `(e: L.LeafletEvent) => void`

  - required: `false`

  - `SVGOverlay`加载成功的回调

- onError

  - type: `(e: L.LeafletEvent) => void`

  - required: `false`

  - `SVGOverlay`加载失败的回调

### 继承自`InteractiveLayer`的`Props`

- interactive

  - type: `boolean`

  - required: `false`

  - `SVGOverlay`是否具有交互效果

- bubblingMouseEvents

  - type: `boolean`

  - required: `false`

  - `SVGOverlay`的鼠标事件是否冒泡

### 继承自`Layer`的`Props`

- pane

  - type: `string`

  - required: `false`

  - default: `overlayPane`

  - 放置`SVGOverlay`的地图图层名称

- attribution

  - type: `string`

  - required: `false`

  - 版权描述

- onCreate

  - type: `(layer: L.Layer) => void`

  - required: `false`

  - `SVGOverlay`创建之后的回调

- onAdd

  - type: `(e: L.LeafletEvent, layer: L.Layer) => void`

  - required: `false`

  - `SVGOverlay`添加到图层之后的回调

- onUpdate

  - type: `(layer: L.Layer) => void`

  - required: `false`

  - `SVGOverlay`发生更新之后的回调

- onBeforeRemove

  - type: `(layer: L.Layer) => void`

  - required: `false`

  - `SVGOverlay`在删除之前的回调

- onRemove

  - type: `(e: L.LeafletEvent, layer: L.Layer) => void`

  - required: `false`

  - `SVGOverlay`删除时的回调

### 继承自`Evented`的`Props`

- onClick

  - type: `(e: L.LeafletMouseEvent) => void`

  - required: `false`

  - `SVGOverlay`鼠标点击时的回调

- onMouseOver

  - type: `(e: L.LeafletMouseEvent) => void`

  - required: `false`

  - `SVGOverlay`鼠标进入时的回调

- onMouseOut

  - type: `(e: L.LeafletMouseEvent) => void`

  - required: `false`

  - `SVGOverlay`鼠标离开时的回调
