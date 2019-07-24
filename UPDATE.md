## v1.1.0

- feature: new Component `MassPoints`.

  ```js
  <MassPoints points />

  <MassPoints points iconUrl />

  <MassPoints points>
    <Popup>this is Popup.</Popup>
    <Tooltip>this is Tooltip.</Tooltip>
  </MassPoints>
  ```

- feature: new Component `ClusterPoints`.

  ```js
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

  ```js
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
