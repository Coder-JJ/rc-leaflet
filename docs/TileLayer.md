## TileLayer

### Examples

- 基本用法

  ```tsx
  import { RCMap, TileLayer } from 'rc-leaflet'

  (
    <RCMap crs center>
      <TileLayer url />
    </RCMap>
  )
  ```

- 定制用法 `v1.2.0+`

  ```tsx
  import { RCMap, TileLayer } from 'rc-leaflet'

  (
    <RCMap crs center>
      <TileLayer.BMap />
      <TileLayer.AMap />
      <TileLayer.OpenStreetMap />
      <TileLayer.GoogleMap />

      <TileLayer.BMap url /> {/* 在定制的基础上进行覆盖 */}
    </RCMap>
  )
  ```

### `Props`

- url

  - type: `string`

  - required: `true`

  - 读取瓦片的`url`路径

- minZoom

  - type: `number`

  - required: `false`

  - 最小缩放级别

- maxZoom

  - type: `number`

  - required: `false`

  - 最大缩放级别

- subdomains

  - type: `string | string[]`

  - required: `false`

  - 读取瓦片`url`路径的子域

- errorTileUrl

  - type: `string`

  - required: `false`

  - 读取瓦片失败时显示瓦片的`url`

- zoomOffset

  - type: `number`

  - required: `false`

  - 缩放级别的偏移

- tms

  - type: `boolean`

  - required: `false`

  - 是否反转`Y`轴, 为`TMS`服务启用该选项

- zoomReverse

  - type: `boolean`

  - required: `false`

  - 设置该选项后, 实际`zoom`值变为`maxZoom - zoom`

- detectRetina

  - type: `boolean`

  - required: `false`

  - 在`retina`显示设备上高清显示

- crossOrigin

  - type: `boolean | string`

  - required: `false`

  - 瓦片图片的`crossorigin`属性

### 继承自`GridLayer`的`Props`

- tileSize

  - type: `number | L.Point`

  - required: `false`

  - 瓦片的大小, `number`时为正方形, 设置`L.Point`时按照`L.Point`的尺寸来设置

- opacity

  - type: `number`

  - required: `false`

  - 瓦片的透明度

- updateWhenIdle

  - type: `boolean`

  - required: `false`

  - 在平移过程中还是平移结束后加载瓦片

- updateWhenZooming

  - type: `boolean`

  - required: `false`

  - 是否跳过连续的缩放, 在连续缩放完成后再加载瓦片

- updateInterval

  - type: `number`

  - required: `false`

  - 平移时瓦片加载更新的时间间隔

- zIndex

  - type: `number`

  - required: `false`

  - 瓦片的`zIndex`

- bounds

  - type: `L.LatLngBoundsExpression`

  - required: `false`

  - 瓦片的视窗

- maxNativeZoom

  - type: `number`

  - required: `false`

  - 在超出该缩放级别的时候使用该缩放级别去显示

- minNativeZoom

  - type: `number`

  - required: `false`

  - 在小于该缩放级别的时候使用该缩放级别去显示

- noWrap

  - type: `boolean`

  - required: `false`

  - whether the layer is wrapped around the antimeridian. If true, the GridLayer will only be displayed once at low zoom levels. Has no effect when the map CRS doesn't wrap around. Can be used in combination with bounds to prevent requesting tiles outside the CRS limits.

- className

  - type: `string`

  - required: `false`

  - 给每张瓦片设置`className`

- keepBuffer

  - type: `number`

  - required: `false`

  - when panning the map, keep this many rows and columns of tiles before unloading them.

### 继承自`Layer`的`Props`

- pane

  - type: `string`

  - required: `false`

  - default: `tilePane`

  - 放置瓦片的地图图层名称

- attribution

  - type: `string`

  - required: `false`

  - 版权描述
