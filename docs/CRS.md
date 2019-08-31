## CRS `v2.0.0+`

### Examples

- 基本用法

  ```tsx
  import { RCMap, Config, TileLayer } from 'rc-leaflet'

  (
    <RCMap crs={Config.CRS.BMap} center>
      <TileLayer />
    </RCMap>
  )
  ```

- 所有可用的`CRS`

  ```tsx
  Config.CRS.BMap
  Config.CRS.AMap
  ```

- 自定义`CRS`

  ```tsx
  import L from 'leaflet'
  import 'proj4leaflet'

  const crs = new L.Proj.CRS(/* ... */)
  ```
