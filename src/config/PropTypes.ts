import PropTypes from 'prop-types'
import { withShape } from 'airbnb-prop-types'
import L from 'leaflet'

const ClassValueTypes = [PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.object, PropTypes.oneOf<null>([null]), PropTypes.oneOf<undefined>([undefined])]
const ClassValue = PropTypes.oneOfType([...ClassValueTypes, PropTypes.arrayOf(PropTypes.oneOfType(ClassValueTypes))])

const Zoom = PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf<'center'>(['center'])])

const PointObject = PropTypes.shape({ lat: PropTypes.number.isRequired, lng: PropTypes.number.isRequired })
const PointTuple: PropTypes.Requireable<[number, number]> = withShape<[number, number], number[], { length: number }>(PropTypes.arrayOf(PropTypes.number.isRequired), { length: PropTypes.oneOf<2>([2]) })
const PixelTuple: PropTypes.Requireable<[number, number]> = PointTuple

const CRS = PropTypes.shape({
  latLngToPoint: PropTypes.func.isRequired,
  pointToLatLng: PropTypes.func.isRequired,
  project: PropTypes.func.isRequired,
  unproject: PropTypes.func.isRequired,
  scale: PropTypes.func.isRequired,
  zoom: PropTypes.func.isRequired,
  getProjectedBounds: PropTypes.func.isRequired,
  distance: PropTypes.func.isRequired,
  wrapLatLng: PropTypes.func.isRequired,
  code: PropTypes.string,
  wrapLng: PointTuple,
  wrapLat: PointTuple,
  infinite: PropTypes.bool.isRequired
})

const Point = PropTypes.oneOfType<typeof PointTuple | typeof PointObject | PropTypes.Requireable<L.LatLng>>([
  PointTuple,
  PointObject,
  PropTypes.instanceOf(L.LatLng)
])

type PointBoundsType = PropTypes.Requireable<[number, number][] | L.LatLngBounds>

const PointBounds: PointBoundsType = PropTypes.oneOfType<PropTypes.Requireable<[number, number][]> | PropTypes.Requireable<L.LatLngBounds>>([
  PropTypes.arrayOf(PointTuple),
  PropTypes.instanceOf(L.LatLngBounds)
])

type PixelType = PropTypes.Requireable<[number, number] | L.PointExpression>

const Pixel: PixelType = PropTypes.oneOfType<typeof PixelTuple | PropTypes.Requireable<L.Point>>([
  PixelTuple,
  PropTypes.instanceOf(L.Point)
])

type BoundsType = PropTypes.Requireable<[number, number][] | L.LatLngBounds>

const Bounds: BoundsType = PropTypes.oneOfType<PropTypes.Requireable<[number, number][]> | PropTypes.Requireable<L.LatLngBounds>>([
  PropTypes.arrayOf(PointTuple),
  PropTypes.instanceOf(L.LatLngBounds)
])

const ZoomOptionsShape = {
  animate: PropTypes.bool
}

const PanOptionsShape = {
  animate: PropTypes.bool,
  duration: PropTypes.number,
  easeLinearity: PropTypes.number,
  noMoveStart: PropTypes.bool
}

const BoundsOptionsShape = {
  paddingTopLeft: Pixel,
  paddingBottomRight: Pixel,
  padding: Pixel,
  maxZoom: PropTypes.number,
  ...ZoomOptionsShape,
  ...PanOptionsShape
}

const BoundsOptions = PropTypes.shape(BoundsOptionsShape)

const LayerOptionsShape = {
  pane: PropTypes.string,
  attribution: PropTypes.string
}

const GridLayerOptionsShape = {
  tileSize: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(L.Point)]),
  opacity: PropTypes.number,
  updateWhenIdle: PropTypes.bool,
  updateWhenZooming: PropTypes.bool,
  updateInterval: PropTypes.number,
  attribution: PropTypes.string,
  zIndex: PropTypes.number,
  bounds: Bounds,
  minZoom: PropTypes.number,
  maxZoom: PropTypes.number,
  noWrap: PropTypes.bool,
  pane: PropTypes.string,
  className: PropTypes.string,
  keepBuffer: PropTypes.number
}

const TileLayerOptionsShape = {
  minZoom: PropTypes.number,
  maxZoom: PropTypes.number,
  maxNativeZoom: PropTypes.number,
  minNativeZoom: PropTypes.number,
  subdomains: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  errorTileUrl: PropTypes.string,
  zoomOffset: PropTypes.number,
  tms: PropTypes.bool,
  zoomReverse: PropTypes.bool,
  detectRetina: PropTypes.bool,
  crossOrigin: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  ...GridLayerOptionsShape
}

export {
  ClassValue,
  Zoom,
  CRS,
  Point,
  PointBounds,
  Pixel,
  Bounds,
  BoundsOptions,
  LayerOptionsShape,
  TileLayerOptionsShape
}
