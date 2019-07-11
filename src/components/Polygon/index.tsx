import PropTypes from 'prop-types'
import L from 'leaflet'
import { Types } from '../../config'
import Path from '../Path'

interface RequiredProps {
  points: L.LatLngExpression[] | L.LatLngExpression[][] | L.LatLngExpression[][][]
}

type Props = Readonly<RequiredProps>

export default class Polygon<P extends L.PolylineOptions = L.PolylineOptions> extends Path<L.Polygon, Props & P> {
  protected static propTypes = {
    ...Path.propTypes,
    points: PropTypes.oneOfType([PropTypes.arrayOf(Types.Point), PropTypes.arrayOf(PropTypes.arrayOf(Types.Point))]).isRequired,
    smoothFactor: PropTypes.number,
    noClip: PropTypes.bool
  }

  protected createInstance (props: Props & P): L.Polygon {
    const { points, ...options } = props

    return L.polygon(points, options)
  }

  public componentDidUpdate (prevProps: Props & P): void {
    const { points: prevPoints } = prevProps
    const { points } = this.props
    const polygon = this.instance

    if (points !== prevPoints) {
      polygon.setLatLngs(points)
    }
    super.bindEvents(prevProps)
    super.setStyle()
  }
}
