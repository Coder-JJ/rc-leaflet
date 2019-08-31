# React Map Components of Leaflet.js

## CHANGELOG

- [rc-leaflet CHANGELOG](https://github.com/Coder-JJ/rc-leaflet/blob/master/CHANGELOG.md)

## Docs

- [Leaflet.js](https://leafletjs.com/)

- [Proj4Leaflet](https://github.com/kartena/Proj4Leaflet)

- [MarkerCluster](https://github.com/Leaflet/Leaflet.markercluster)

## Features

- [x] `TypeScript` support

- [x] `JSX` support for `Popup`, `Tooltip` and `DivIcon`

- [x] `MassPoints` support, about max 150k points. `(v1.1.0+)`

- [x] `ClusterPoints` support, about max 50k points. `(v1.1.0+)`

- [x] RCMap scope `Theme` support

- [x] Import on Demand (tree-shaking)

## Components

- [x] [RCMap](https://github.com/Coder-JJ/rc-leaflet/blob/master/docs/RCMap.md)

- [x] [Theme](https://github.com/Coder-JJ/rc-leaflet/blob/master/docs/Theme.md)

- [x] [TileLayer](https://github.com/Coder-JJ/rc-leaflet/blob/master/docs/TileLayer.md)

- [x] [LayerGroup](https://github.com/Coder-JJ/rc-leaflet/blob/master/docs/LayerGroup.md) `(v1.4.0+)`

- [x] [FeatureGroup](https://github.com/Coder-JJ/rc-leaflet/blob/master/docs/FeatureGroup.md) `(v1.4.0+)`

- [x] [GeoJSON](https://github.com/Coder-JJ/rc-leaflet/blob/master/docs/GeoJSON.md) `(v1.4.0+)`

- [x] [Point](https://github.com/Coder-JJ/rc-leaflet/blob/master/docs/Point.md)

- [x] [MassPoints](https://github.com/Coder-JJ/rc-leaflet/blob/master/docs/MassPoints.md) `(v1.1.0+)`

- [x] [ClusterPoints](https://github.com/Coder-JJ/rc-leaflet/blob/master/docs/ClusterPoints.md) `(v1.1.0+)` **will deprecate in `v1.5.0+`, use [rc-leaflet-cluster](https://github.com/Coder-JJ/rc-leaflet-cluster) instead**

- [x] [CircleMarker](https://github.com/Coder-JJ/rc-leaflet/blob/master/docs/CircleMarker.md)

- [x] [Circle](https://github.com/Coder-JJ/rc-leaflet/blob/master/docs/Circle.md)

- [x] [Polyline](https://github.com/Coder-JJ/rc-leaflet/blob/master/docs/Polyline.md)

- [x] [Polygon](https://github.com/Coder-JJ/rc-leaflet/blob/master/docs/Polygon.md)

- [x] [Rectangle](https://github.com/Coder-JJ/rc-leaflet/blob/master/docs/Rectangle.md)

- [x] [ImageOverlay](https://github.com/Coder-JJ/rc-leaflet/blob/master/docs/ImageOverlay.md) `(v1.4.0+)`

- [x] [VideoOverlay](https://github.com/Coder-JJ/rc-leaflet/blob/master/docs/VideoOverlay.md) `(v1.4.0+)`

- [x] [SVGOverlay](https://github.com/Coder-JJ/rc-leaflet/blob/master/docs/SVGOverlay.md) `(v1.4.0+)`

- [x] [Icon](https://github.com/Coder-JJ/rc-leaflet/blob/master/docs/Icon.md)

- [x] [DivIcon](https://github.com/Coder-JJ/rc-leaflet/blob/master/docs/DivIcon.md)

- [x] [Popup](https://github.com/Coder-JJ/rc-leaflet/blob/master/docs/Popup.md)

- [x] [Tooltip](https://github.com/Coder-JJ/rc-leaflet/blob/master/docs/Tooltip.md)

## Plugins

- [x] [rc-leaflet-heat](https://github.com/Coder-JJ/rc-leaflet-heat)

- [x] [rc-leaflet-drawing](https://github.com/Coder-JJ/rc-leaflet-drawing)

- [ ] [rc-leaflet-cluster](https://github.com/Coder-JJ/rc-leaflet-cluster)

- [ ] rc-leaflet-routing

## Configuration

- [x] [CRS](https://github.com/Coder-JJ/rc-leaflet/blob/master/docs/CRS.md)

- [x] [TileLayers](https://github.com/Coder-JJ/rc-leaflet/blob/master/docs/TileLayers.md)

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
