## Icon

### Examples

- Basic Usage

  ```tsx
  import { RCMap, TileLayer, Point, ClusterPoints, Icon } from 'rc-leaflet'

  (
    <RCMap crs center>
      <TileLayer />

      <Point />

      <Icon iconUrl>
        <Point />
      </Icon>

      <Point>
        <Icon iconUrl />
      </Point>

      <Icon>
        <ClusterPoints />
      </Icon>
    </RCMap>
  )
  ```

### Props

- iconUrl

  - type: `string`

  - required: `true`

  - 图标的资源地址

- iconRetinaUrl

  - type: `string`

  - required: `false`

  - `retina`显示屏图标的资源地址

- iconSize

  - type: `[number, number] | L.Point`

  - required: `false`

  - 图标的大小

- iconAnchor

  - type: `[number, number] | L.Point`

  - required: `false`

  - 图标的锚点

- shadowUrl

  - type: `string`

  - required: `false`

  - 图标阴影的资源地址

- shadowRetinaUrl

  - type: `string`

  - required: `false`

  - `retina`显示屏图标阴影的资源地址

- shadowSize

  - type: `[number, number] | L.Point`

  - required: `false`

  - 图标阴影的大小

- shadowAnchor

  - type: `[number, number] | L.Point`

  - required: `false`

  - 图标阴影的锚点

- popupAnchor

  - type: `[number, number] | L.Point`

  - required: `false`

  - `Popup`的锚点

- tooltipAnchor

  - type: `[number, number] | L.Point`

  - required: `false`

  - `Tooltip`的锚点

- className

  - type: `string`

  - required: `false`

  - 图标的类名
