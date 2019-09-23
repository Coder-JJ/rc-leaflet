## ClusterPoints `v1.1.0+`

### Examples

- Basic Usage

  ```tsx
  import {
    RCMap,
    TileLayer,
    ClusterPoints
  } from 'rc-leaflet'

  (
    <RCMap crs center>
      <TileLayer />
      <ClusterPoints points />
    </RCMap>
  )
  ```

- Full Usage

  ```tsx
  (
    <DivIcon>
      <ClusterPoints points>
        <Point.Content />
        <Popup />
        <Tooltip />
      </ClusterPoints>
    </DivIcon>
  )
  ```

### Props

- points

  - type: `L.LatLngExpression[]`

  - required: `true`

  - 点位数据

- clusterPane

  - type: `string`

  - required: `false`

  - 聚合点位所在图层

- showCoverageOnHover

  - type: `boolean`

  - required: `false`

  - 鼠标悬浮的时候显示聚合点位的`Bounds`边界

- polygonOptions

  - type: `L.PolylineOptions`

  - required: `false`

  - 鼠标悬浮的时候显示聚合点位的`Bounds`边界的样式

- zoomToBoundsOnClick

  - type: `boolean`

  - required: `false`

  - 鼠标点击的时候缩放至聚合点位的`Bounds`边界

- spiderfyOnMaxZoom

  - type: `boolean`

  - required: `false`

  - 在最大缩放级别下, 如果点位仍是聚合状态, 则在点击的时候分岔显示至实际地理位置

- spiderLegPolylineOptions

  - type: `L.PolylineOptions`

  - required: `false`

  - 在最大缩放级别下点击聚合点位所产生分岔线的样式

- spiderfyDistanceMultiplier

  - type: `number`

  - required: `false`

  - increase from 1 to increase the distance away from the center that spiderfied markers are placed, use if you are using big marker icons

- removeOutsideVisibleBounds

  - type: `boolean`

  - required: `false`

  - 是否渲染离地图视窗很远的点位或者聚合点位

- animate

  - type: `boolean`

  - required: `false`

  - 点位聚合, 解除聚合, 以及分岔是否有动画效果

- animateAddingMarkers

  - type: `boolean`

  - required: `false`

  - 在新增点位的时候是否有动画效果

- disableClusteringAtZoom

  - type: `number`

  - required: `false`

  - 在超出该缩放级别时所有点位都解除聚合独立呈现

- maxClusterRadius

  - type: `number | (zoom: number) => number`

  - required: `false`

  - 点位聚合的最大半径, 单位像素

- singleMarkerMode

  - type: `boolean`

  - required: `false`

  - if set to true, overrides the icon for all added markers to make them appear as a 1 size cluster

- iconCreateFunction

  - type: `(cluster: L.MarkerCluster) => L.Icon | L.DivIcon`

  - required: `false`

  - 创建自定义图标的回调函数

- chunkedLoading

  - type: `boolean`

  - required: `false`

  - 分批加载点位

- chunkInterval

  - type: `number`

  - required: `false`

  - 让页面其他进程优先处理的事件间隔

- chunkDelay

  - type: `number`

  - required: `false`

  - 分批加载点位的事件间隔

- chunkProgress

  - type: `(processed?: number, total?: number, time?: number) => void`

  - required: `false`

  - 分批处理进度回调函数

### `Props` inherited from `Layer`

- attribution

  - type: `string`

  - required: `false`

  - 版权描述

- onCreate

  - type: `(layer: L.Layer) => void`

  - required: `false`

  - `ClusterPoints`创建之后的回调

- onAdd

  - type: `(e: L.LeafletEvent, layer: L.Layer) => void`

  - required: `false`

  - `ClusterPoints`添加到图层之后的回调

- onUpdate

  - type: `(layer: L.Layer) => void`

  - required: `false`

  - `ClusterPoints`发生更新之后的回调

- onBeforeRemove

  - type: `(layer: L.Layer) => void`

  - required: `false`

  - `ClusterPoints`在删除之前的回调

- onRemove

  - type: `(e: L.LeafletEvent, layer: L.Layer) => void`

  - required: `false`

  - `ClusterPoints`删除时的回调

### `Props` inherited from `Evented`

- onClick

  - type: `(e: L.LeafletMouseEvent) => void`

  - required: `false`

  - 非聚合点位鼠标点击时的回调

- onMouseOver

  - type: `(e: L.LeafletMouseEvent) => void`

  - required: `false`

  - 非聚合点位鼠标进入时的回调

- onMouseOut

  - type: `(e: L.LeafletMouseEvent) => void`

  - required: `false`

  - 非聚合点位鼠标离开时的回调
