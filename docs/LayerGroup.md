## LayerGroup `v1.3.0+`

### Examples

- 基本用法

  ```tsx
  import {
    RCMap,
    TileLayer,
    LayerGroup,
    FeatureGroup,
    GeoJSON,
    Point,
    CircleMarker,
    Circle,
    Polyline,
    Polygon,
    Rectangle,
    ImageOverlay,
    VideoOverlay,
    SVGOverlay
  } from 'rc-leaflet'

  (
    <RCMap crs center>
      <TileLayer />
      <LayerGroup>
        <Point />
        <CircleMarker />
        <Circle />
        <Polyline />
        <Polygon />
        <Rectangle />
        <ImageOverlay />
        <VideoOverlay />
        <SVGOverlay />
      </LayerGroup>
    </RCMap>
  )
  ```

- 多层嵌套

  ```tsx
  (
    <LayerGroup>
      <Circle />
      <LayerGroup />
      <FeatureGroup />
      <GeoJSON />
    </LayerGroup>
  )
  ```

### `Props`

- zIndex

  - type: `number`

  - required: `false`

  - 只对`Point`和基于`ImageOverlay`的组件起作用

### 继承自`InteractiveLayer`的`Props`

- interactive

  - type: `boolean`

  - required: `false`

  - `LayerGroup`是否具有交互效果

- bubblingMouseEvents

  - type: `boolean`

  - required: `false`

  - `LayerGroup`的鼠标事件是否冒泡

### 继承自`Layer`的`Props`

- pane

  - type: `string`

  - required: `false`

  - default: `overlayPane`

  - 放置`LayerGroup`的地图图层名称

- attribution

  - type: `string`

  - required: `false`

  - 版权描述

- onCreate

  - type: `(layer: L.Layer) => void`

  - required: `false`

  - `LayerGroup`创建之后的回调

- onAdd

  - type: `(e: L.LeafletEvent, layer: L.Layer) => void`

  - required: `false`

  - `LayerGroup`添加到图层之后的回调

- onUpdate

  - type: `(layer: L.Layer) => void`

  - required: `false`

  - `LayerGroup`发生更新之后的回调

- onBeforeRemove

  - type: `(layer: L.Layer) => void`

  - required: `false`

  - `LayerGroup`在删除之前的回调

- onRemove

  - type: `(e: L.LeafletEvent, layer: L.Layer) => void`

  - required: `false`

  - `LayerGroup`删除时的回调

### 继承自`Evented`的`Props`

- onClick

  - type: `(e: L.LeafletMouseEvent) => void`

  - required: `false`

  - `LayerGroup`鼠标点击时的回调

- onMouseOver

  - type: `(e: L.LeafletMouseEvent) => void`

  - required: `false`

  - `LayerGroup`鼠标进入时的回调

- onMouseOut

  - type: `(e: L.LeafletMouseEvent) => void`

  - required: `false`

  - `LayerGroup`鼠标离开时的回调
