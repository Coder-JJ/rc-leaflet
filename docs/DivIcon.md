## DivIcon

### Examples

- 基本用法

  ```tsx
  import { RCMap, TileLayer, Point, ClusterPoints, DivIcon } from 'rc-leaflet'

  (
    <RCMap crs center>
      <TileLayer />

      <Point />

      <DivIcon className>
        <Point />
      </DivIcon>

      <Point>
        <DivIcon className />
      </Point>

      <DivIcon>
        <ClusterPoints />
      </DivIcon>
    </RCMap>
  )
  ```

### Props

- className

  - type: `string`

  - required: `false`

  - 图标的类名

- bgPos

  - type: `[number, number] | L.Point`

  - required: `false`

  - 图标背景的相对位置

### 继承自`Icon`的`Props`

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
