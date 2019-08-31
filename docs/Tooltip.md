## Tooltip

### Examples

- 基本用法

  ```tsx
  import {
    RCMap,
    TileLayer,
    Point,
    LayerGroup,
    FeatureGroup,
    GeoJSON,
    CircleMarker,
    Circle,
    Polyline,
    Polygon,
    Rectangle,
    ImageOverlay,
    VideoOverlay,
    SVGOverlay,
    Tooltip
  } from 'rc-leaflet'

  (
    <RCMap crs center>
      <TileLayer />

      {/* 支持JSX */}
      <Tooltip position>
        <div />
        <List />
      </Tooltip>

      <LayerGroup>
        <Tooltip />
      </LayerGroup>

      <FeatureGroup>
        <Tooltip />
      </FeatureGroup>

      <GeoJSON>
        <Tooltip />
      </GeoJSON>

      <CircleMarker>
        <Tooltip />
      </CircleMarker>

      <Circle>
        <Tooltip />
      </Circle>

      <Polyline>
        <Tooltip />
      </Polyline>

      <Polygon>
        <Tooltip />
      </Polygon>

      <Rectangle>
        <Tooltip />
      </Rectangle>

      <ImageOverlay>
        <Tooltip />
      </ImageOverlay>

      <VideoOverlay>
        <Tooltip />
      </VideoOverlay>

      <SVGOverlay>
        <Tooltip />
      </SVGOverlay>
    </RCMap>
  )
  ```

### Props

- position

  - type: `L.LatLngExpression`

  - required: `false`

  - 当在地图上绑定`Tooltip`时需要设置`position`

- direction

  - type: `'right' | 'left' | 'top' | 'bottom' | 'center' | 'auto'`

  - required: `false`

  - `Tooltip`显示的位置, 如果没有设置, 则根据情况在左边或右边显示

- permanent

  - type: `boolean`

  - required: `false`

  - 永久打开`Tooltip`还是只在鼠标悬浮时打开

- sticky

  - type: `boolean`

  - required: `false`

  - `Tooltip`是否跟随鼠标移动

- interactive

  - type: `boolean`

  - required: `false`

  - `Tooltip`是否具有交互效果

- opacity

  - type: `number`

  - required: `false`

  - `Tooltip`的透明度

- onOpen

  - type: `(e: L.LeafletEvent) => void`

  - required: `false`

  - `Tooltip`打开时的回调

- onClose

  - type: `(e: L.LeafletEvent) => void`

  - required: `false`

  - `Tooltip`关闭时的回调

### 继承自`DivOverlay`的`Props`

- className

  - type: `string`

  - required: `false`

  - 设置`Tooltip`的`className`

- offset

  - type: `[number, number] | L.Point`

  - required: `false`

  - 当在`overlay`上打开`Tooltip`时的偏移值

- zoomAnimation

  - type: `boolean`

  - required: `false`

  - 缩放动画

### 继承自`Layer`的`Props`

- pane

  - type: `string`

  - required: `false`

  - default: `tooltipPane`

  - 放置`Tooltip`的地图图层名称

- attribution

  - type: `string`

  - required: `false`

  - 版权描述
