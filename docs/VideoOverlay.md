## VideoOverlay `v1.4.0+`

### Examples

- Basic Usage

  ```tsx
  import {
    RCMap,
    TileLayer,
    VideoOverlay,
    Popup,
    Tooltip
  } from 'rc-leaflet'

  (
    <RCMap crs center>
      <TileLayer />
      <VideoOverlay video bounds />
    </RCMap>
  )
  ```

- 设置`DivOverlay`

  ```tsx
  // interactive必须设置
  (
    <VideoOverlay video bounds interactive>
      <Popup />
      <Tooltip />
    </VideoOverlay>
  )
  ```

### Props

- video

  - type: `string | string[] | HTMLVideoElement`

  - required: `true`

  - 设置视频资源

- bounds

  - type: `L.LatLngBoundsExpression`

  - required: `true`

  - 视频的视窗

- autoplay

  - type: `boolean`

  - required: `false`

  - 视频加载完成后是否自动播放

- loop

  - type: `boolean`

  - required: `false`

  - 视频播放完成后是否循环播放

- keepAspectRatio

  - type: `boolean`

  - required: `false`

  - 视频是否保持纵横比例

- onLoad

  - type: `(e: L.LeafletEvent) => void`

  - required: `false`

  - 视频加载成功的回调

- onError

  - type: `(e: L.LeafletEvent) => void`

  - required: `false`

  - 视频加载失败的回调

### `Props` inherited from `ImageOverlay`

- opacity

  - type: `number`

  - required: `false`

  - 视频的透明度

- alt

  - type: `string`

  - required: `false`

  - `video`标签的`alt`属性

- crossOrigin

  - type: `boolean | string`

  - required: `false`

  - `video`标签的`crossorigin`属性

- errorOverlayUrl

  - type: `string`

  - required: `false`

  - 视频加载失败时显示的`url`

- zIndex

  - type: `number`

  - required: `false`

  - 设置视频的`z-index`

- className

  - tpye: `string`

  - required: `false`

  - 设置视频的类名

### `Props` inherited from `InteractiveLayer`

- interactive

  - type: `boolean`

  - required: `false`

  - `VideoOverlay`是否具有交互效果

- bubblingMouseEvents

  - type: `boolean`

  - required: `false`

  - `VideoOverlay`的鼠标事件是否冒泡

### `Props` inherited from `Layer`

- pane

  - type: `string`

  - required: `false`

  - default: `overlayPane`

  - 放置`VideoOverlay`的地图图层名称

- attribution

  - type: `string`

  - required: `false`

  - 版权描述

- onCreate

  - type: `(layer: L.Layer) => void`

  - required: `false`

  - `VideoOverlay`创建之后的回调

- onAdd

  - type: `(e: L.LeafletEvent, layer: L.Layer) => void`

  - required: `false`

  - `VideoOverlay`添加到图层之后的回调

- onUpdate

  - type: `(layer: L.Layer) => void`

  - required: `false`

  - `VideoOverlay`发生更新之后的回调

- onBeforeRemove

  - type: `(layer: L.Layer) => void`

  - required: `false`

  - `VideoOverlay`在删除之前的回调

- onRemove

  - type: `(e: L.LeafletEvent, layer: L.Layer) => void`

  - required: `false`

  - `VideoOverlay`删除时的回调

### `Props` inherited from `Evented`

- onClick

  - type: `(e: L.LeafletMouseEvent) => void`

  - required: `false`

  - `VideoOverlay`鼠标点击时的回调

- onMouseOver

  - type: `(e: L.LeafletMouseEvent) => void`

  - required: `false`

  - `VideoOverlay`鼠标进入时的回调

- onMouseOut

  - type: `(e: L.LeafletMouseEvent) => void`

  - required: `false`

  - `VideoOverlay`鼠标离开时的回调
