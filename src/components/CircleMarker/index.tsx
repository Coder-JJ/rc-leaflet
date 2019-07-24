import Path from '../Path'
import PropTypes from 'prop-types'
import { Types } from '../../config'
import { Omit } from '../Util/Types'
import L from 'leaflet'

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
    center: Types.Point.isRequired
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
    super.bindEvents(prevProps)
    super.setStyle()
  }
}
