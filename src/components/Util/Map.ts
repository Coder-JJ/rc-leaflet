import L from 'leaflet'
import { MapHandler } from './Types'

export const handlers: MapHandler[] = ['boxZoom', 'doubleClickZoom', 'dragging', 'keyboard', 'scrollWheelZoom', 'tap', 'touchZoom']

export const getBounds = (map: L.Map, scale: number = 1): L.LatLngBounds => {
  const { x, y } = map.getSize()
  const padding = (scale - 1) / 2
  return L.latLngBounds(map.containerPointToLatLng([-padding * x, (1 + padding) * y]), map.containerPointToLatLng([(1 + padding) * x, -padding * y]))
}
