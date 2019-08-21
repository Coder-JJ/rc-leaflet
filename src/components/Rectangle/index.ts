import Path from '../Path'
import PropTypes from 'prop-types'
import { PointBounds } from '../../util/PropTypes'
import L from 'leaflet'

interface RequiredProps {
  bounds: L.LatLngBoundsExpression
}

type Props = Readonly<RequiredProps>

export default class Rectangle<P extends L.PolylineOptions = L.PolylineOptions> extends Path<L.Rectangle, Props & P> {
  public static propTypes = {
    ...Path.propTypes,
    bounds: PointBounds.isRequired,
    smoothFactor: PropTypes.number,
    noClip: PropTypes.bool
  }

  protected createInstance (props: Props & P): L.Rectangle {
    const { bounds, ...options } = props

    return L.rectangle(bounds, options)
  }

  public componentDidUpdate (prevProps: Props & P): void {
    const { bounds: prevBounds } = prevProps
    const { bounds } = this.props
    const rectangle = this.instance

    if (prevBounds !== bounds) {
      rectangle.setBounds(bounds)
    }
    super.componentDidUpdate(prevProps)
  }
}
