## v1.2.0

- remove: remove `content` prop of `DivIcon`, there are too many edge cases to handle with.

- feature: new Component `Point.Content`, used to replace `content` prop of `DivIcon`.

  ```jsx
  <Point>
    <Point.Content />
  </Point>

  <Point>
    <DivIcon>
      <Point.Content />
    </DivIcon>
  </Point>

  <DivIcon>
    <Point>
      <Point.Content />
    </Point>
  </DivIcon>

  <ClusterPoints>
    <Point.Content />
  </ClusterPoints>

  <DivIcon>
    <ClusterPoints>
      <Point.Content />
    </ClusterPoints>
  </DivIcon>
  ```

- feature: new Components, export all abstract Components for plugin development.

- feature: add `TileLayers.OpenStreetMap`, `TileLayers.GoogleMap` config.

- feature: new Components `TileLayer.BMap`, `TileLayer.AMap`, `TileLayer.OpenStreetMap`, `TileLayer.GoogleMap`

  ```jsx
  <RCMap crs>
    <TileLayer.GoogleMap />
  </RCMap>
  ```

## v1.1.3

- fix: handle the edge case when layer of `DivOverlay` is changed.

## v1.1.2

- fix: unbind map events when `MassPoints` is unmounted.

## v1.1.1

- fix: `RCMap` `bounds` Bug

## v1.1.0

- feature: new Component `MassPoints`.

  ```jsx
  <MassPoints points />

  <MassPoints points iconUrl />

  <MassPoints points>
    <Popup>this is Popup.</Popup>
    <Tooltip>this is Tooltip.</Tooltip>
  </MassPoints>
  ```

- feature: new Component `ClusterPoints`.

  ```jsx
  <ClusterPoints points />

  <DivIcon>
    <ClusterPoints points>
      <Popup>this is Popup.</Popup>
      <Tooltip>this is Tooltip.</Tooltip>
    </ClusterPoints>
  </DivIcon>
  ```

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
