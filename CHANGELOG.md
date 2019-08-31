## v1.3.0

- feature: new Component [LayerGroup](https://github.com/Coder-JJ/rc-leaflet/blob/master/docs/LayerGroup.md).

- feature: new Component [FeatureGroup](https://github.com/Coder-JJ/rc-leaflet/blob/master/docs/FeatureGroup.md).

- feature: new Component [GeoJSON](https://github.com/Coder-JJ/rc-leaflet/blob/master/docs/GeoJSON.md).

- feature: new Component [ImageOverlay](https://github.com/Coder-JJ/rc-leaflet/blob/master/docs/ImageOverlay.md).

- feature: new Component [VideoOverlay](https://github.com/Coder-JJ/rc-leaflet/blob/master/docs/VideoOverlay.md).

- feature: new Component [SVGOverlay](https://github.com/Coder-JJ/rc-leaflet/blob/master/docs/SVGOverlay.md).

## v1.2.2

- fix: `MassPoints` createInstance this `Bug`.

- feature: add onUpdate lifecycle hook to components extends Layer, for plugin development.

## v1.2.1

- fix: Point.Content Bug fix.

- feature: add onCreate, onAdd, onBeforeRemove, onRemove lifecycle hooks to components extends Layer, for plugin development.

## v1.2.0

- remove: remove `content` prop of `DivIcon`, there are too many edge cases to handle with.

- feature: new Component [Point.Content](https://github.com/Coder-JJ/rc-leaflet/blob/master/docs/Point.md), used to replace `content` prop of `DivIcon`.

- feature: new Components, export all abstract Components for plugin development.

- feature: add `TileLayers.OpenStreetMap`, `TileLayers.GoogleMap` config.

- feature: new Components `TileLayer.BMap`, `TileLayer.AMap`, `TileLayer.OpenStreetMap`, `TileLayer.GoogleMap`, see [TileLayer](https://github.com/Coder-JJ/rc-leaflet/blob/master/docs/TileLayer.md).

## v1.1.3

- fix: handle the edge case when layer of `DivOverlay` is changed.

## v1.1.2

- fix: unbind map events when `MassPoints` is unmounted.

## v1.1.1

- fix: `RCMap` `bounds` Bug

## v1.1.0

- feature: new Component [MassPoints](https://github.com/Coder-JJ/rc-leaflet/blob/master/docs/MassPoints.md).

- feature: new Component [ClusterPoints](https://github.com/Coder-JJ/rc-leaflet/blob/master/docs/ClusterPoints.md).

- feature: `RCMap` supports all leaflet options.

- fix: `Icon` and `DivIcon` can not update.

- fix: `Icon` and `DivIcon` defaultProps problem.

- fix: `Theme` does not work at first time.

---

## v1.0.2

- feature: `RCMap` supports onZoom, onZoomStart, onZoomEnd callbacks.

---

## v1.0.1

- feature: `DivIcon` supports single jsx element.

  ```jsx
  let Content = (
    <div>
      <div>content row.</div>
      <div>content row.</div>
    </div>
  )

  <DivIcon content={Content}>
  ```

- fix: `Popup` and `Tooltip` can not display jsx when they are under point.

---

## v1.0.0

- `RCMap` published.
