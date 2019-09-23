## RCMap

### Examples

- Basic Usage

  ```tsx
  import { RCMap, Config, TileLayer } from 'rc-leaflet'

  (
    <RCMap crs center>
      <TileLayer />
    </RCMap>
  )
  ```

- 使用百度地图

  ```tsx
  (
    <RCMap crs={Config.CRS.BMap} center>
      <TileLayer.BMap />
    </RCMap>
  )
  ```

### Props

- className

  - type: `ClassValue`

  - required: `false`

  - 地图容器的类名

- crs

  - type: `L.CRS`

  - required: `false`

  - the Coordinate Reference System to use, don't change this if you're not sure what it means

- center

  - type: `L.LatLngExpression`

  - required: `false`

  - 地图的中心点

- zoom

  - type: `number`

  - required: `false`

  - 地图的初始化缩放级别

- minZoom

  - type: `number`

  - required: `false`

  - 地图的最小缩放级别

- maxZoom

  - type: `number`

  - required: `false`

  - 地图的最大缩放级别

- layers

  - type: `L.Layer[]`

  - required: `false`

  - 地图初始化显示的图层

- bounds

  - type: `L.LatLngBoundsExpression`

  - required: `false`

  - 将地图缩放至指定区域

- boundsOptions

  - type: `L.FitBoundsOptions`

  - required: `false`

  - 将地图缩放至指定区域的设置选项

- flyToBounds

  - type: `boolean`

  - required: `false`

  - 是否平滑地将地图缩放至指定区域

- maxBounds

  - type: `L.LatLngBoundsExpression`

  - required: `false`

  - 限制地图的显示区域

- maxBoundsViscosity

  - type: `number`

  - required: `false`

  - 拖拽地图超出`maxBounds`时的平滑程度

- renderer

  - type: `L.Renderer`

  - required: `false`

  - 在地图上画`Path`的引擎

- preferCanvas

  - type: `boolean`

  - required: `false`

  - `Path`是否用`Canvas`渲染

- onZoom

  - type: `(e: L.LeafletEvent) => void`

  - required: `false`

  - 地图缩放时的回调

- onZoomStart

  - type: `(e: L.LeafletEvent) => void`

  - required: `false`

  - 地图缩放前的回调

- onZoomEnd

  - type: `(e: L.LeafletEvent) => void`

  - required: `false`

  - 地图缩放后的回调

- onInit

  - type: `(e: L.Map) => void`

  - required: `false`

  - 地图示例初始化完成的回调

### Control Props

- attributionControl

  - type: `boolean`

  - required: `false`

  - whether a attribution control is added to the map by default

- zoomControl

  - type: `boolean`

  - required: `false`

  - whether a zoom control is added to the map by default

### Interaction Props

- closePopupOnClick

  - type: `boolean`

  - required: `false`

  - 是否在点击地图的时候关闭`Popup`

- zoomSnap

  - type: `number`

  - required: `false`

  - forces the map's zoom level to always be a multiple of this, particularly right after a fitBounds() or a pinch-zoom

- zoomDelta

  - type: `number`

  - required: `false`

  - 缩放刻度

- trackResize

  - type: `boolean`

  - required: `false`

  - 地图是否跟随浏览器调整大小

- boxZoom

  - type: `boolean`

  - required: `false`

  - 地图是否支持`Shift`加鼠标画矩形聚焦

- doubleClickZoom

  - type: `boolean | 'center'`

  - required: `false`

  - 地图是否支持双击放大, 按住`Shift`双击缩小, 设置`center`时以当前地图中心点缩放

- dragging

  - type: `boolean`

  - required: `false`

  - 地图是否支持拖拽

### Animation Props

- zoomAnimation

  - type: `boolean`

  - required: `false`

  - 地图缩放是否开启动画

- zoomAnimationThreshold

  - type: `number`

  - required: `false`

  - 如果缩放跨度超过该值, 则禁用动画

- fadeAnimation

  - type: `boolean`

  - required: `false`

  - 瓦片是否开启动画

- markerZoomAnimation

  - type: `boolean`

  - required: `false`

  - 点位是否开启动画

- transform3DLimit

  - type: `number`

  - required: `false`

  - defines the maximum size of a CSS translation transform. The default value should not be changed unless a web browser positions layers in the wrong place after doing a large panBy

### Panning Inertia Props

- inertia

  - type: `boolean`

  - required: `false`

  - 地图平移是否具有惯性

- inertiaDeceleration

  - type: `number`

  - required: `false`

  - the rate with which the inertial movement slows down, in pixels/second²

- inertiaMaxSpeed

  - type: `number`

  - required: `false`

  - 惯性的最大速度

- easeLinearity

  - type: `number`

  - required: `false`

- worldCopyJump

  - type: `boolean`

  - required: `false`

  - with this option enabled, the map tracks when you pan to another "copy" of the world and seamlessly jumps to the original one so that all overlays like markers and vector layers are still visible

### Keyboard Navigation Props

- keyboard

  - type: `boolean`

  - required: `false`

  - 地图是否支持键盘交互, 上下左右平移, =/-进行缩放

- keyboardPanDelta

  - type: `number`

  - required: `false`

  - 键盘方向键平移的刻度, 单位像素

### Mousewheel Props

- scrollWheelZoom

  - type: `boolean | 'center'`

  - required: `false`

  - 地图是否支持滚轮缩放, 设置`center`时以当前地图中心点缩放

- wheelDebounceTime

  - type: `number`

  - required: `false`

  - 滚轮缩放的节流间隔

- wheelPxPerZoomLevel

  - type: `number`

  - required: `false`

  - how many scroll pixels (as reported by L.DomEvent.getWheelDelta) mean a change of one full zoom level, smaller values will make wheel-zooming faster (and vice versa)

### Touch Interaction Props

- tap

  - type: `boolean`

  - required: `false`

  - 是否支持移动设备触摸

- tapTolerance

  - type: `number`

  - required: `false`

  - 超过该像素值的触摸才会被视为一次有效触摸

- touchZoom

  - type: `boolean | 'center'`

  - required: `false`

  - 是否支持双指缩放, 设置`center`时以当前地图中心点缩放

- bounceAtZoomLimits

  - type: `boolean`

  - required: `false`

  - 是否允许超过超过`maxZoom`和`minZoom`
