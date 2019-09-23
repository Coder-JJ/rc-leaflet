## MassPoints `v2.2.0+`

### Examples

- Basic Usage

  ```tsx
  import { RCMap, TileLayer, MassPoints, Popup, Tooltip } from 'rc-leaflet'

  const points = [
    { position, iconUrl, iconSize, iconAnchor, popupAnchor, tooltipAnchor, ...rest }
  ]

  return (
    <RCMap crs center>
      <TileLayer />
      <MassPoints points />
    </RCMap>
  )
  ```

- Full Usage

  ```tsx
  const points = [
    { position, iconUrl, iconSize, iconAnchor, popupAnchor, tooltipAnchor, ...rest }
  ]

  return (
    <RCMap crs center>
      <TileLayer />
      <MassPoints points iconUrl iconSize iconAnchor popupAnchor tooltipAnchor>
        <Popup>
          { target => <div /> }
        </Popup>
        <Tooltip>
          { target => <div /> }
        </Tooltip>
      </MassPoints>
    </RCMap>
  )
  ```

### MassPoint

```ts
{
  position: L.LatLngExpression
  iconUrl: string
  iconSize: L.PointExpression
  iconAnchor: L.PointExpression
  popupAnchor: L.PointExpression
  tooltipAnchor: L.PointExpression
  [key: string]: any
}
```

### Props

- points

  - type: `MassPoint[]`

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

### `Props` inherited from `Layer`

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

### `Props` inherited from `Evented`

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
