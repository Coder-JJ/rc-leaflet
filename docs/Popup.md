## Popup

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
    Popup
  } from 'rc-leaflet'

  (
    <RCMap crs center>
      <TileLayer />

      {/* 支持JSX */}
      <Popup position>
        <div />
        <List />
      </Popup>

      <LayerGroup>
        <Popup />
      </LayerGroup>

      <FeatureGroup>
        <Popup />
      </FeatureGroup>

      <GeoJSON>
        <Popup />
      </GeoJSON>

      <CircleMarker>
        <Popup />
      </CircleMarker>

      <Circle>
        <Popup />
      </Circle>

      <Polyline>
        <Popup />
      </Polyline>

      <Polygon>
        <Popup />
      </Polygon>

      <Rectangle>
        <Popup />
      </Rectangle>

      <ImageOverlay>
        <Popup />
      </ImageOverlay>

      <VideoOverlay>
        <Popup />
      </VideoOverlay>

      <SVGOverlay>
        <Popup />
      </SVGOverlay>
    </RCMap>
  )
  ```

### Props

- position

  - type: `L.LatLngExpression`

  - required: `false`

  - 当在地图上绑定`Popup`时需要设置`position`

- maxWidth

  - type: `number`

  - required: `false`

  - `Popup`的最大宽度

- minWidth

  - type: `number`

  - required: `false`

  - `Popup`的最小宽度

- maxHeight

  - type: `number`

  - required: `false`

  - `Popup`的最大高度

- autoPan

  - type: `boolean`

  - required: `false`

  - `Popup`打开的时候地图是否自动平移定位

- autoPanPaddingTopLeft

  - type: `[number, number] | L.Point`

  - required: `false`

  - 当地图`auto panning`时`Popup`与地图左上角的偏移值

- autoPanPaddingBottomRight

  - type: `[number, number] | L.Point`

  - required: `false`

  - 当地图`auto panning`时`Popup`与地图右下角的偏移值

- autoPanPadding

  - type: `[number, number] | L.Point`

  - required: `false`

  - 当地图`auto panning`时`Popup`与地图左上和右下角的偏移值

- keepInView

  - type: `boolean`

  - required: `false`

  - 是否禁止将`Popup`平移出界面

- closeButton

  - type: `boolean`

  - required: `false`

  - 是否显示关闭按钮

- autoClose

  - type: `boolean`

  - required: `false`

  - 当另一个`Popup`打开的时候是否自动关闭

- closeOnEscapeKey

  - type: `boolean`

  - required: `false`

  - 按`ESC`按钮的时候是否关闭`Popup`

- closeOnClick

  - type: `boolean`

  - required: `false`

  - 鼠标点击地图的时候是否关闭`Popup`

- onOpen

  - type: `(e: L.LeafletEvent) => void`

  - required: `false`

  - `Popup`打开时的回调

- onClose

  - type: `(e: L.LeafletEvent) => void`

  - required: `false`

  - `Popup`关闭时的回调

### 继承自`DivOverlay`的`Props`

- className

  - type: `string`

  - required: `false`

  - 设置`Popup`的`className`

- offset

  - type: `[number, number] | L.Point`

  - required: `false`

  - 当在`overlay`上打开`Popup`时的偏移值

- zoomAnimation

  - type: `boolean`

  - required: `false`

  - 缩放动画

### 继承自`Layer`的`Props`

- pane

  - type: `string`

  - required: `false`

  - default: `popupPane`

  - 放置`Popup`的地图图层名称

- attribution

  - type: `string`

  - required: `false`

  - 版权描述
