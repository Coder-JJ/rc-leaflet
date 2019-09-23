## ImageOverlay `v1.4.0+`

### Examples

- Basic Usage

  ```tsx
  import {
    RCMap,
    TileLayer,
    ImageOverlay,
    Popup,
    Tooltip
  } from 'rc-leaflet'

  (
    <RCMap crs center>
      <TileLayer />
      <ImageOverlay url bounds />
    </RCMap>
  )
  ```

- 设置`DivOverlay`

  ```tsx
  // interactive必须设置
  (
    <ImageOverlay url bounds interactive>
      <Popup />
      <Tooltip />
    </ImageOverlay>
  )
  ```

### Props

- url

  - type: `string`

  - required: `true`

  - 图片`url`

- bounds

  - type: `L.LatLngBoundsExpression`

  - required: `true`

  - 图片的视窗

- opacity

  - type: `number`

  - required: `false`

  - 图片的透明度

- alt

  - type: `string`

  - required: `false`

  - `img`标签的`alt`属性

- crossOrigin

  - type: `boolean | string`

  - required: `false`

  - `img`标签的`crossorigin`属性

- errorOverlayUrl

  - type: `string`

  - required: `false`

  - 图片加载失败时显示的`url`

- zIndex

  - type: `number`

  - required: `false`

  - 设置图片的`z-index`

- className

  - tpye: `string`

  - required: `false`

  - 设置图片的类名

- onLoad

  - type: `(e: L.LeafletEvent) => void`

  - required: `false`

  - 图片加载成功的回调

- onError

  - type: `(e: L.LeafletEvent) => void`

  - required: `false`

  - 图片加载失败的回调

### `Props` inherited from `InteractiveLayer`

- interactive

  - type: `boolean`

  - required: `false`

  - `ImageOverlay`是否具有交互效果

- bubblingMouseEvents

  - type: `boolean`

  - required: `false`

  - `ImageOverlay`的鼠标事件是否冒泡

### `Props` inherited from `Layer`

- pane

  - type: `string`

  - required: `false`

  - default: `overlayPane`

  - 放置`ImageOverlay`的地图图层名称

- attribution

  - type: `string`

  - required: `false`

  - 版权描述

- onCreate

  - type: `(layer: L.Layer) => void`

  - required: `false`

  - `ImageOverlay`创建之后的回调

- onAdd

  - type: `(e: L.LeafletEvent, layer: L.Layer) => void`

  - required: `false`

  - `ImageOverlay`添加到图层之后的回调

- onUpdate

  - type: `(layer: L.Layer) => void`

  - required: `false`

  - `ImageOverlay`发生更新之后的回调

- onBeforeRemove

  - type: `(layer: L.Layer) => void`

  - required: `false`

  - `ImageOverlay`在删除之前的回调

- onRemove

  - type: `(e: L.LeafletEvent, layer: L.Layer) => void`

  - required: `false`

  - `ImageOverlay`删除时的回调

### `Props` inherited from `Evented`

- onClick

  - type: `(e: L.LeafletMouseEvent) => void`

  - required: `false`

  - `ImageOverlay`鼠标点击时的回调

- onMouseOver

  - type: `(e: L.LeafletMouseEvent) => void`

  - required: `false`

  - `ImageOverlay`鼠标进入时的回调

- onMouseOut

  - type: `(e: L.LeafletMouseEvent) => void`

  - required: `false`

  - `ImageOverlay`鼠标离开时的回调
