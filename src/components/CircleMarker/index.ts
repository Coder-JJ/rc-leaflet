import PropTypes from 'prop-types'
import L from 'leaflet'
import { Point } from '../../util/PropTypes'
import Path from '../Path'

export type CircleMarkerOptions = Omit<L.CircleMarkerOptions, 'radius'>

interface RequiredProps {
  center: L.LatLngExpression
  radius: number
}

export type Props = Readonly<RequiredProps>

export default class CircleMarker<P extends CircleMarkerOptions = CircleMarkerOptions> extends Path<L.CircleMarker, Props & P> {
  public static propTypes = {
    ...Path.propTypes,
    radius: PropTypes.number.isRequired,
    center: Point.isRequired
  }

  protected createInstance (props: Props & P): L.CircleMarker {
    const { center, ...options } = props

    return L.circleMarker(center, options)
  }

  public componentDidUpdate (prevProps: Props & P): void {
    const { center: prevCenter, radius: prevRadius } = prevProps
    const { center, radius } = this.props
    const circle = this.instance

    if (center && center !== prevCenter) {
      circle.setLatLng(center)
    }
    if (radius && radius !== prevRadius) {
      circle.setRadius(radius)
    }
    super.componentDidUpdate(prevProps)
  }
}
