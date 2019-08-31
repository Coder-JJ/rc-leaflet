## FeatureGroup `v1.4.0+`

### Examples

- 基本用法

  ```tsx
  import {
    RCMap,
    TileLayer,
    GeoJSON,
    Popup
  } from 'rc-leaflet'

  (
    <RCMap crs center>
      <TileLayer />
      <GeoJSON data />

      <GeoJSON data>
        <Popup />
      </GeoJSON>
    </RCMap>
  )
  ```

- 统一设置`Path`样式

  ```tsx
  const style = { color: 'red' }

  (
    <GeoJSON data style={style} />
  )
  ```

### Props

- data

  - type: `Geometry | Geometry[] | Feature | Feature[] | FeatureCollection`

  - required: `true`

  - `geo`经纬度`json`数据

- pointToLayer

  - type: `(feature: geo.Feature<geo.Point>, position: L.LatLng) => L.Layer`

  - required: `false`

  - 点位`json`数据的渲染函数, 默认渲染点位

- style

  - type: `L.PathOptions | (feature?: geo.Feature<geo.GeometryObject>) => L.PathOptions`

  - required: `false`

  - 设置`geo`线和多边形的样式

- onEachFeature

  - type: `(feature: geo.Feature<geo.GeometryObject>, layer: L.Layer) => void`

  - required: `false`

  - 对每个添加到地图的`geo`元素执行一定的操作

- filter

  - type: `(feature: geo.Feature<geo.GeometryObject>) => boolean`

  - required: `false`

  - 对后续添加到地图的`geo`元素进行过滤

- coordsToLatLng

  - type: `(coords: [number, number] | [number, number, number]) => L.LatLng`

  - required: `false`

  - 点位数组转换成`L.LatLng`的转换函数, 默认为点位格式为`[lng, lat]`, 通过设置该函数, 可以传入`[lat, lng]`

### 继承自`LayerGroup`的`Props`

- zIndex

  - type: `number`

  - required: `false`

  - 现阶段不起作用

### 继承自`Layer`的`Props`

- pane

  - type: `string`

  - required: `false`

  - default: `overlayPane`

  - 放置`GeoJSON`的地图图层名称

- attribution

  - type: `string`

  - required: `false`

  - 版权描述

- onCreate

  - type: `(layer: L.Layer) => void`

  - required: `false`

  - `GeoJSON`创建之后的回调

- onAdd

  - type: `(e: L.LeafletEvent, layer: L.Layer) => void`

  - required: `false`

  - `GeoJSON`添加到图层之后的回调

- onUpdate

  - type: `(layer: L.Layer) => void`

  - required: `false`

  - `GeoJSON`发生更新之后的回调

- onBeforeRemove

  - type: `(layer: L.Layer) => void`

  - required: `false`

  - `GeoJSON`在删除之前的回调

- onRemove

  - type: `(e: L.LeafletEvent, layer: L.Layer) => void`

  - required: `false`

  - `GeoJSON`删除时的回调

### 继承自`Evented`的`Props`

- onClick

  - type: `(e: L.LeafletMouseEvent) => void`

  - required: `false`

  - `GeoJSON`鼠标点击时的回调

- onMouseOver

  - type: `(e: L.LeafletMouseEvent) => void`

  - required: `false`

  - `GeoJSON`鼠标进入时的回调

- onMouseOut

  - type: `(e: L.LeafletMouseEvent) => void`

  - required: `false`

  - `GeoJSON`鼠标离开时的回调
