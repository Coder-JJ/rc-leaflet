## TileLayers

### Examples

- Basic Usage

  ```tsx
  import { RCMap, Config, TileLayer } from 'rc-leaflet'

  let layers = [
    Config.TileLayers.BMap
  ]

  return <RCMap crs layers={layers} center />
  ```

- 所有可用的`CRS`

  ```tsx
  Config.TileLayers.BMap
  Config.TileLayers.AMap
  Config.TileLayers.OpenStreetMap
  Config.TileLayers.GoogleMap
  ```

- 自定义`TileLayer`

  ```tsx
  let options: L.TileLayerOptions = {}
  const tileLayer = L.tileLayer('url', options)
  ```
