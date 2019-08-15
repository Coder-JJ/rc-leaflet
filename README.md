# React Components of Leaflet.js

## History Versions

- [RCMap Update Logs](https://github.com/Coder-JJ/rc-leaflet/blob/master/UPDATE.md)

## Docs

- [Leaflet.js](https://leafletjs.com/)

- [Proj4Leaflet](https://www.npmjs.com/package/proj4leaflet)

- [MarkerCluster](https://www.npmjs.com/package/leaflet.markercluster)

## Features

- `TypeScript` support

- `JSX` support for `Popup`, `Tooltip` and `DivIcon`

- `MassPoints` support, about max 150k points. `(v1.1.0+)`

- `ClusterPoints` support, about max 50k points. `(v1.1.0+)`

- RCMap scope `Theme` support

- Import on Demand (tree-shaking)

## Components

- [RCMap](#RCMap)

- [Theme](#Theme)

- [TileLayer](#TileLayer)

- [TileLayer.BMap](#TileLayer) `(v1.2.0+)`

- [TileLayer.AMap](#TileLayer) `(v1.2.0+)`

- [TileLayer.OpenStreetMap](#TileLayer) `(v1.2.0+)`

- [TileLayer.GoogleMap](#TileLayer) `(v1.2.0+)`

- [Point](#Point)

- [Point.Content](#Point) `(v1.2.0+)`

- [MassPoints](#MassPoints) `(v1.1.0+)`

- [ClusterPoints](#ClusterPoints) `(v1.1.0+)`

- [CircleMarker](#CircleMarker)

- [Circle](#Circle)

- [Polyline](#Polyline)

- [Polygon](#Polygon)

- [Rectangle](#Rectangle)

- [Icon](#Icon)

- [DivIcon](#DivIcon)

- [Popup](#Popup)

- [Tooltip](#Tooltip)

## Configuration

- CRS

- TileLayers

## Data Structure

- ThemeProps: `{ path?: L.PathOptions }` (see [Leaflet.js](#docs) docs)

- ClassValue: `string` | `number` | `{ [key: string]: ClassValue }` | `Array<ClassValue>` | `undefined` | `null` | `boolean`

- Point: `L.LatLng` | `{ lat: number, lng: number }` | `[number, number]`

- Pixel: `L.Point` | `[number, number]`

- BoundsOptions:

  ```js
  {
    paddingTopLeft?: Pixel,
    paddingBottomRight?: Pixel,
    padding?: Pixel,
    maxZoom?: number,
    animate?: boolean,
    duration?: number,
    easeLinearity?: number,
    noMoveStart?: boolean
  }
  ```

## Usage

### Install

```cmd
npm install rc-leaflet --save
```

### Import on Demand

```cmd
npm install babel-plugin-import --save-dev
```

```js
// .babelrc or babel-loader option
{
  "plugins": [
    [
      "import",
      {
        "libraryName": "rc-leaflet",
        "libraryDirectory": "es/components",
        "camel2DashComponentName": false
      },
      "rc-leaflet-import"
    ]
  ]
}
```

## APIs

### `RCMap`

#### `Usage`

```jsx
import { RCMap } from 'rc-leaflet'

(
  <RCMap>
    ...
  </RCMap>
)
```

#### `Props`

- className

  - type: [ClassValue](#Data-Structure)

  - default: `undefined`

  - required: `false`

  - the className of Map container.

- center

  - type: [Point](#Data-Structure)

  - required: `true`

  - initial geographic center of the map.

- crs

  - type: `L.CRS`

  - default: `L.CRS.EPSG3857`

  - required: `false`

  - `Coordinate Reference System`, `leaflet.js` has several crs configurations, and `rc-leaflet` also provides two default crs configurations, or you can write your custom crs via `proj4leaflet`.

    ```js
    import L from 'leaflet'
    import Proj from 'proj4leaflet'
    import { Config } from 'rc-leaflet'

    const { CRS } = Config

    console.log(L.CRS.EPSG3857, L.CRS)
    console.log(CRS.BMap, CRS.AMap)
    const crs = new Proj.CRS(/* see proj4leaflet docs */)
    ```

- layers

  - type: `Array<L.Layer>`

  - default: `[]`

  - required: `false`

  - used to load and display tile layers on the map, `rc-leaflet` provides two default layers configurations.

    ```js
    import { Config } from 'rc-leaflet'

    const { TileLayers } = Config

    console.log(TileLayers.BMap, TileLayers.AMap, TileLayers.OpenStreetMap, TileLayers.GoogleMap)
    ```

- minZoom

  - type: `number`

  - default: `1`

  - required: `false`

  - minimum zoom level of the map.

- maxZoom

  - type: `number`

  - default: `18`

  - required: `false`

  - maximum zoom level of the map.

- zoom

  - type: `number`

  - default: `15`

  - required: `false`

  - initial map zoom level.

- flyToBounds

  - type: `boolean`

  - default: `true`

  - required: `false`

  - this prop tells `rc-leaflet` whether to call `flyToBounds` or call `fitBounds`, it works only when `bounds` prop is not null.

- bounds

  - type: Array<[Point](#Data-Structure)>

  - default: `undefined`

  - required: `false`

  - sets a map view that contains the given geographical bounds with the maximum zoom level possible.

- boundsOptions

  - type: [BoundsOptions](#Data-Structure)

  - default: `undefined`

  - required: `false`

  - some options when call `flyToBounds` or `fitBounds`. See [BoundsOptions](#Data-Structure).

- maxBounds

  - type: Array<[Point](#Data-Structure)>

  - default: `undefined`

  - required: `false`

  - when this option is set, the map restricts the view to the given geographical bounds, bouncing the user back if the user tries to pan outside the view. To set the restriction dynamically.

- onZoom

  - type: `Function`

  - default: `noop function`

  - required: `false`

  - fired repeatedly during any change in zoom level, including zoom and fly animations.

- onZoomStart

  - type: `Function`

  - default: `noop function`

  - required: `false`

  - fired when the map zoom is about to change (e.g. before zoom animation).

- onZoomEnd

  - type: `Function`

  - default: `noop function`

  - required: `false`

  - fired when the map has changed, after any animations.

- onInit

  - type: `Function`

  - default: `noop function`

  - required: `false`

  - onInit is called when map is initialized, it gives user the map instance.

### `Theme`

#### `Usage`

```jsx
import { Theme, RCMap } from 'rc-leaflet'

(
  <Theme>
    <RCMap>
      ...
    </RCMap>
  </Theme>
)
```

#### `Props`

- value

  - type: [ThemeProps](#Data-Structure)

  - required: `true`

  - set the theme of components which extends L.Path.

### `TileLayer`

#### `Usage`

```jsx
import { RCMap, TileLayer } from 'rc-leaflet'

(
  <RCMap>
    <TileLayer />
  </RCMap>

  <RCMap>
    <TileLayer.BMap />
  </RCMap>

  <RCMap>
    <TileLayer.AMap />
  </RCMap>

  <RCMap>
    <TileLayer.OpenStreetMap />
  </RCMap>

  <RCMap>
    <TileLayer.GoogleMap />
  </RCMap>
)
```

#### `Props`

- url

  - type: `string`

  - required: `true`

  - url of L.tileLayer

- other props

  - see [Leaflet.js](#docs) docs

### `Point`

#### `Usage`

```jsx
import { RCMap, Point } from 'rc-leaflet'

(
  <RCMap>
    <Point />

    <Point>
      <Point.Content className>
        <div>first row.</div>
        <div>second row.</div>
      </Point.Content>
    </Point>
  </RCMap>
)
```

#### `Props`

- position

  - type: [Point](#Data-Structure)

  - required: `true`

  - a geographical point with a certain latitude and longitude.

- zIndexOffset

  - type: `number`

  - default: `0`

  - required: `false`

  - by default, marker images zIndex is set automatically based on its latitude. Use this option if you want to put the marker on top of all others (or below), specifying a high value like 1000 (or high negative value, respectively).

- onClick, onMouseOver, onMouseOut

  - type: `Function`

  - default: `noop function`

  - required: `false`

  - mouse events of Point.

- other props

  - see [Leaflet.js](#docs) docs

### `MassPoints`

#### `Usage`

```jsx
import { RCMap, MassPoints, Popup, Tooltip } from 'rc-leaflet'

(
  <RCMap>
    <MassPoints points />

    <MassPoints points>
      <Popup>this is Popup.</Popup>
      <Tooltip>this is Tooltip.</Tooltip>
    </MassPoints>
  </RCMap>
)
```

#### `Props`

- points

  - type: Array<[Point](#Data-Structure)>

  - required: `true`

  - geographical points.

- iconUrl, iconSize, iconAnchor, popupAnchor, tooltipAnchor

  - required: `false`

  - same as props of [Icon](#Icon)

- other props

  - required: `false`

  - type: `L.ImageOverlayOptions`

  - see [Leaflet.js](#docs) docs.

### `ClusterPoints`

#### `Usage`

```jsx
import { RCMap, Point, ClusterPoints, Popup, Tooltip } from 'rc-leaflet'

(
  <RCMap>
    <ClusterPoints points />

    <DivIcon>
      <ClusterPoints points>
        <Point.Content />
        <Popup>this is Popup.</Popup>
        <Tooltip>this is Tooltip.</Tooltip>
      </ClusterPoints>
    </DivIcon>
  </RCMap>
)
```

#### `Props`

- points

  - type: Array<[Point](#Data-Structure)>

  - required: `true`

  - geographical points.

- other props

  - required: `false`

  - type: `L.MarkerClusterGroupOptions`

  - see [MarkerCluster](#docs) docs.

### `CircleMarker`

#### `Usage`

```jsx
import { RCMap, CircleMarker } from 'rc-leaflet'

(
  <RCMap>
    <CircleMarker />
  </RCMap>
)
```

#### `Props`

- center

  - type: [Point](#Data-Structure)

  - required: `true`

  - geographical point of CircleMarker center.

- radius

  - type: `number`

  - required: `true`

  - radius of the CircleMarker, in pixels.

- color

  - type: `string`

  - default: `#3388ff`

  - required: `false`

  - stroke color.

- weight

  - type: `number`

  - default: `3`

  - required: `false`

  - stroke width in pixels.

- onClick, onMouseOver, onMouseOut

  - type: `Function`

  - default: `noop function`

  - required: `false`

  - mouse events of CircleMarker.

- other props

  - see [Leaflet.js](#docs) docs.

### `Circle`

extends CircleMarker

#### `Usage`

same as CircleMarker

#### `Props`

- radius

  - type: `number`

  - required: `true`

  - radius of the Circle, in meters.

- other props

  - same as CircleMarker

  - see [Leaflet.js](#docs) docs.

### `Polyline`

#### `Usage`

```jsx
import { RCMap, Polyline } from 'rc-leaflet'

(
  <RCMap>
    <Polyline />
  </RCMap>
)
```

#### `Props`

- points

  - type: Array<[Point](#Data-Structure)> `|` Array<Array<[Point](#Data-Structure)>>

  - default: `[]`

  - required: false

  - geographical points.

- color

  - type: `string`

  - default: `#3388ff`

  - required: `false`

  - stroke color.

- weight

  - type: `number`

  - default: `3`

  - required: `false`

  - stroke width in pixels.

- onClick, onMouseOver, onMouseOut

  - type: `Function`

  - default: `noop function`

  - required: `false`

  - mouse events of Polyline.

- other props

  - see [Leaflet.js](#docs) docs

### `Polygon`

extends Path

#### `Usage`

same as [Polyline](#Polyline)

#### `Props`

- points

  - type: Array<[Point](#Data-Structure)> `|` Array<Array<[Point](#Data-Structure)>> `|` Array<Array<Array<[Point](#Data-Structure)>>>

  - required: true

  - geographical points.

- other props

  - same as [Polyline](#Polyline)

  - see [Leaflet.js](#docs) docs.

### `Rectangle`

extends Path

#### `Usage`

same as [Polygon](#Polygon)

#### `Props`

- bounds

  - type: `L.LatLngBounds | Array<[number, number]>`

  - required: true

  - rectangle geographical bounds.

- other props

  - same as [Polygon](#Polygon)

  - see [Leaflet.js](#docs) docs.

### `Icon`

#### `Usage`

```jsx
import { RCMap, Icon, Point } from 'rc-leaflet'

(
  <RCMap>
    <Icon>
      <Point />
    </Icon>

    <Point>
      <Icon />
    </Point>
  </RCMap>
)
```

#### `Props` (tips: Icon is not suggested, use DivIcon instead.)

- className

  - type: `string`

  - default: `''`

  - required: false

  - the className of Icon container.

- iconUrl

  - type: `string`

  - default: `defaultIconUrl`

  - required: `false`

  - the URL to the icon image (absolute or relative to your script path).

- iconSize

  - type: [Pixel](#Data-Structure)

  - default: `null`

  - required: `false`

  - size of the icon image in pixels.

- iconAnchor

  - type: [Pixel](#Data-Structure)

  - default: `null`

  - required: `false`

  - the coordinates of the "tip" of the icon (relative to its top left corner). The icon will be aligned so that this point is at the marker's geographical location. Centered by default if size is specified, also can be set in CSS with negative margins.

- shadowUrl

  - type: `string`

  - default: `null`

  - required: `false`

  - the URL to the icon shadow image. If not specified, no shadow image will be created.

- shadowSize

  - type: [Pixel](#Data-Structure)

  - default: `null`

  - required: `false`

  - size of the shadow image in pixels.

- shadowAnchor

  - type: [Pixel](#Data-Structure)

  - default: `null`

  - required: `false`

  - the coordinates of the "tip" of the shadow (relative to its top left corner) (the same as iconAnchor if not specified).

- popupAnchor

  - type: [Pixel](#Data-Structure)

  - default: `null`

  - required: `false`

  - the coordinates of the point from which popups will "open", relative to the icon anchor.

- tooltipAnchor

  - type: [Pixel](#Data-Structure)

  - default: `null`

  - required: `false`

  - the coordinates of the point from which tooltips will "open", relative to the icon anchor.

### `DivIcon`

#### `Usage`

```jsx
import { RCMap, Point, DivIcon, Point } from 'rc-leaflet'

(
  <RCMap>
    <DivIcon>
      <Point>
        <Point.Content />
      </Point>
    </DivIcon>

    <Point>
      <DivIcon>
        <Point.Content />
      </DivIcon>
    </Point>
  </RCMap>
)
```

#### `Props`

- className

  - type: `string`

  - default: `''`

  - required: false

  - the className of DivIcon container.

- bgPos

  - type: [Pixel](#Data-Structure)

  - default: `[0, 0]`

  - required: `false`

  - optional relative position of the background, in pixels.

- iconSize, iconAnchor, popupAnchor, tooltipAnchor

  - type: [Pixel](#Data-Structure)

  - required: `false`

  - inherited from Icon, see [Icon Props](#Icon).

### `Popup`

#### `Usage`

```jsx
import { RCMap, Popup, Point, CircleMarker, Circle, Polyline } from 'rc-leaflet'

(
  <RCMap>
    <Popup>Popup supprts JSX Content</Popup>

    <Point>
      <Popup />
    </Point>

    <CircleMarker>
      <Tooltip />
    </CircleMarker>

    <Circle>
      <Tooltip />
    </Circle>

    <Polyline>
      <Popup />
    </Polyline>
  </RCMap>
)
```

#### `Props`

- className

  - type: `string`

  - default: `''`

  - required: `false`

  - the className of Popup container.

- position

  - type: [Point](#Data-Structure)

  - default: `undefined`

  - required: `false`

  - position is needed only when popup is set directly under the map component.

- maxWidth

  - type: `number`

  - default: `300`

  - required: `false`

  - max width of the popup, in pixels.

- minWidth

  - type: `number`

  - default: `50`

  - required: `false`

  - min width of the popup, in pixels.

- maxHeight

  - type: `number`

  - default: `null`

  - required: `false`

  - if set, creates a scrollable container of the given height inside a popup if its content exceeds it.

- pane

  - type: `string`

  - default: `popupPane`

  - required: `false`

  - map pane where the popup will be added.

- offset

  - type: [Pixel](#Data-Structure)

  - default: `[0, 7]`

  - required: `false`

  - the offset of the popup position. Useful to control the anchor of the popup when opening it on some overlays.

- autoPan

  - type: `boolean`

  - default: `true`

  - required: `false`

  - set it to false if you don't want the map to do panning animation to fit the opened popup.

- autoPanPaddingTopLeft

  - type: [Pixel](#Data-Structure)

  - default: `null`

  - required: `false`

  - the margin between the popup and the top left corner of the map view after autopanning was performed.

- autoPanPaddingBottomRight

  - type: [Pixel](#Data-Structure)

  - default: `null`

  - required: `false`

  - the margin between the popup and the bottom right corner of the map view after autopanning was performed.

- autoPanPadding

  - type: [Pixel](#Data-Structure)

  - default: `[5, 5]`

  - required: `false`

  - equivalent of setting both top left and bottom right autopan padding to the same value.

- keepInView

  - type: `boolean`

  - default: `false`

  - required: `false`

  - set it to true if you want to prevent users from panning the popup off of the screen while it is open.

- closeButton

  - type: `boolean`

  - default: `true`

  - required: `false`

  - controls the presence of a close button in the popup.

- autoClose

  - type: `boolean`

  - default: `true`

  - required: `false`

  - set it to false if you want to override the default behavior of the popup closing when another popup is opened.

- closeOnEscapeKey

  - type: `boolean`

  - default: `true`

  - required: `false`

  - set it to false if you want to override the default behavior of the ESC key for closing of the popup.

- closeOnClick

  - type: `boolean`

  - default: `undefined`

  - required: `false`

  - set it if you want to override the default behavior of the popup closing when user clicks on the map.

- onOpen

  - type: `Function`

  - default: `noop function`

  - required: `false`

  - fired when the popup is opened.

- onClose

  - type: `Function`

  - default: `noop function`

  - required: `false`

  - fired when the popup is closed.

### `Tooltip`

#### `Usage`

```jsx
import { RCMap, Tooltip, Point, CircleMarker, Circle, Polyline } from 'rc-leaflet'

(
  <RCMap>
    <Tooltip>Tooltip supprts JSX Content</Tooltip>

    <Point>
      <Tooltip />
    </Point>

    <CircleMarker>
      <Tooltip />
    </CircleMarker>

    <Circle>
      <Tooltip />
    </Circle>

    <Polyline>
      <Tooltip />
    </Polyline>
  </RCMap>
)
```

#### `Props`

- className

  - type: `string`

  - default: `''`

  - required: `false`

  - the className of Tooltip container.

- position

  - type: [Point](#Data-Structure)

  - default: `undefined`

  - required: `false`

  - position is needed only when Tooltip is set directly under the map component.

- pane

  - type: `string`

  - default: `tooltipPane`

  - required: `false`

  - map pane where the tooltip will be added.

- offset

  - type: [Pixel](#Data-Structure)

  - default: `[0, 7]`

  - required: `false`

  - the offset of the tooltip position. Useful to control the anchor of the tooltip when opening it on some overlays.

- onOpen

  - type: `Function`

  - default: `noop function`

  - required: `false`

  - fired when the tooltip is opened.

- onClose

  - type: `Function`

  - default: `noop function`

  - required: `false`

  - fired when the tooltip is closed.

## What's next?

- new Components: `LayerGroup`, `FeatureGroup`, `DrawingTools`, `Routing`
