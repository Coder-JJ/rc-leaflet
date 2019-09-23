## Theme

### Examples

- Basic Usage

  ```tsx
  import { RCMap, Theme, TileLayer } from 'rc-leaflet'

  let theme = {
    path: {
      color: 'red',
      weight: 10,
      opacity: 0.5
    }
  }

  (
    <Theme value={theme}>
      <RCMap crs center>
        <TileLayer />
      </RCMap>
    </Theme>
  )
  ```

### Props

- value

  - type: `{ path: L.PathOptions }`

  - required: `true`

  - 目前只支持`Path`主题设置
