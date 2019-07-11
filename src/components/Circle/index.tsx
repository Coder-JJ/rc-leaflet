import L from 'leaflet'
import CircleMarker, { CircleMarkerOptions, Props } from '../CircleMarker'

export default class Circle<P extends CircleMarkerOptions = CircleMarkerOptions> extends CircleMarker<P> {
  protected createInstance (props: CircleMarkerOptions & Props): L.Circle {
    const { center, radius, ...options } = props

    return L.circle(center, radius, options)
  }
}
