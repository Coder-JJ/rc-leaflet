## MassPoints `v1.1.0+`

### Examples

- 基本用法

  ```tsx
  import { RCMap, TileLayer, MassPoints, Popup, Tooltip } from 'rc-leaflet'

  (
    <RCMap crs center>
      <TileLayer />
      <MassPoints points />
    </RCMap>
  )
  ```

- 完整用法

  ```tsx
  (
    <RCMap crs center>
      <TileLayer />
      <MassPoints points iconUrl>
        <Popup />
        <Tooltip />
      </MassPoints>
    </RCMap>
  )
  ```

### Props

- points

  - type: `L.LatLngExpression[]`

  - required: `true`

  - 点位数据

- iconUrl

  - type: `string`

  - required: `false`

  - 图标资源地址

- iconSize

  - type: `[number, number] | L.Point`

  - required: `false`

  - 图标的大小

- iconAnchor

  - type: `[number, number] | L.Point`

  - required: `false`

  - 图标的锚点

- popupAnchor

  - type: `[number, number] | L.Point`

  - required: `false`

  - `Popup`的锚点

- tooltipAnchor

  - type: `[number, number] | L.Point`

  - required: `false`

  - `Tooltip`的锚点

### 继承自`ImageOverlayOptions`的`Props`

- opacity

  - type: `number`

  - required: `false`

  - 图层的透明度

- alt

  - type: `string`

  - required: `false`

  - 图层的`alt`属性

- crossOrigin

  - type: `boolean | string`

  - required: `false`

  - 图层的`crossorigin`属性

- errorOverlayUrl

  - type: `string`

  - required: `false`

  - 图层图片加载失败时显示的`url`

- zIndex

  - type: `number`

  - required: `false`

  - 设置图层的`z-index`

- className

  - tpye: `string`

  - required: `false`

  - 设置图层的类名

- onLoad

  - type: `(e: L.LeafletEvent) => void`

  - required: `false`

  - 图层加载成功的回调

- onError

  - type: `(e: L.LeafletEvent) => void`

  - required: `false`

  - 图层加载失败的回调

### 继承自`InteractiveLayer`的`Props`

- interactive

  - type: `boolean`

  - required: `false`

  - 图层是否具有交互效果

- bubblingMouseEvents

  - type: `boolean`

  - required: `false`

  - 图层的鼠标事件是否冒泡

### 继承自`Layer`的`Props`

- pane

  - type: `string`

  - required: `false`

  - default: `overlayPane`

  - 放置图层的地图图层名称

- attribution

  - type: `string`

  - required: `false`

  - 版权描述

- onCreate

  - type: `(layer: L.Layer) => void`

  - required: `false`

  - 图层创建之后的回调

- onAdd

  - type: `(e: L.LeafletEvent, layer: L.Layer) => void`

  - required: `false`

  - 图层添加到图层之后的回调

- onUpdate

  - type: `(layer: L.Layer) => void`

  - required: `false`

  - 图层发生更新之后的回调

- onBeforeRemove

  - type: `(layer: L.Layer) => void`

  - required: `false`

  - 图层在删除之前的回调

- onRemove

  - type: `(e: L.LeafletEvent, layer: L.Layer) => void`

  - required: `false`

  - 图层删除时的回调

### 继承自`Evented`的`Props`

- onClick

  - type: `(e: L.LeafletMouseEvent) => void`

  - required: `false`

  - 图层鼠标点击时的回调

- onMouseOver

  - type: `(e: L.LeafletMouseEvent) => void`

  - required: `false`

  - 图层鼠标进入时的回调

- onMouseOut

  - type: `(e: L.LeafletMouseEvent) => void`

  - required: `false`

  - 图层鼠标离开时的回调
