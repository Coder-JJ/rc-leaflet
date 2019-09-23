## Point

### Examples

- Basic Usage

  ```tsx
  import { RCMap, TileLayer, Point, DivIcon } from 'rc-leaflet'

  (
    <RCMap>
      <TileLayer />

      <Point position />

      <Point position>
        <DivIcon />
      </Point>

      <DivIcon className>
        <Point />
      </DivIcon>
    </RCMap>
  )
  ```

- 设置JSX内容 `v1.2.0+`

  ```tsx
  (
    <RCMap crs center>
      <TileLayer />

      <Point position>
        <Point.Content className>...</Point.Content>
      </Point>

      <Point position>
        <DivIcon>
          <Point.Content className>...</Point.Content>
        </DivIcon>
      </Point>

      <DivIcon className>
        <Point position>
          <Point.Content className>...</Point.Content>
        </Point>
      </DivIcon>
    </RCMap>
  )
  ```

### Props

- position

  - type: `L.LatLng | { lat: number, lng: number } | [number, number]`

  - required: `true`

  - 点位的坐标

- keyboard

  - type: `boolean`

  - required: `false`

  - 点位是否支持鼠标交互, `Tab`键切换不同点位, `Enter`键模拟点击

- title

  - type: `string`

  - required: `false`

  - 鼠标悬浮时显示的文本

- alt

  - type: `string`

  - required: `false`

  - `Icon`组件`img`标签的`alt`属性

- zIndexOffset

  - type: `number`

  - required: `false`

  - 点位的`z-index`值

- opacity

  - type: `number`

  - required: `false`

  - 点位的透明度

- riseOnHover

  - type: `boolean`

  - required: `false`

  - 鼠标悬浮时是否置顶

- riseOffset

  - type: `number`

  - required: `false`

  - 鼠标悬浮时`z-index`的偏移值

- shadowPane

  - type: `string`

  - required: `false`

  - 点位阴影所在的图层

- draggable

  - type: `boolean`

  - required: `false`

  - 点位是否可以拖拽

- autoPan

  - type: `boolean`

  - required: `false`

  - 在地图边缘拖拽鼠标时是否自动平移地图

- autoPanPadding

  - type: `[number, number] | L.Point`

  - required: `false`

  - 在地图边缘拖拽鼠标时自动平移地图触发的边界位置

- autoPanSpeed

  - type: `number`

  - required: `false`

  - 在地图边缘拖拽鼠标时自动平移地图的像素值

### `Props` inherited from `InteractiveLayer`

- interactive

  - type: `boolean`

  - required: `false`

  - `Point`是否具有交互效果

- bubblingMouseEvents

  - type: `boolean`

  - required: `false`

  - `Point`的鼠标事件是否冒泡

### `Props` inherited from `Layer`

- pane

  - type: `string`

  - required: `false`

  - default: `markerPane`

  - 放置`Point`的地图图层名称

- attribution

  - type: `string`

  - required: `false`

  - 版权描述

- onCreate

  - type: `(layer: L.Layer) => void`

  - required: `false`

  - `Point`创建之后的回调

- onAdd

  - type: `(e: L.LeafletEvent, layer: L.Layer) => void`

  - required: `false`

  - `Point`添加到图层之后的回调

- onUpdate

  - type: `(layer: L.Layer) => void`

  - required: `false`

  - `Point`发生更新之后的回调

- onBeforeRemove

  - type: `(layer: L.Layer) => void`

  - required: `false`

  - `Point`在删除之前的回调

- onRemove

  - type: `(e: L.LeafletEvent, layer: L.Layer) => void`

  - required: `false`

  - `Point`删除时的回调

### `Props` inherited from `Evented`

- onClick

  - type: `(e: L.LeafletMouseEvent) => void`

  - required: `false`

  - `Point`鼠标点击时的回调

- onMouseOver

  - type: `(e: L.LeafletMouseEvent) => void`

  - required: `false`

  - `Point`鼠标进入时的回调

- onMouseOut

  - type: `(e: L.LeafletMouseEvent) => void`

  - required: `false`

  - `Point`鼠标离开时的回调
