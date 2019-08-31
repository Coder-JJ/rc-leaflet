import PropTypes from 'prop-types'
import L from 'leaflet'
import { Point as GeoPoint, Geometry, Feature, FeatureCollection } from 'geojson'
import { ContextType } from '../RCMap/Context'
import { defaultIcon } from '../DivIcon/creator'
import Path from '../Path'
import { Props as LayerGroupProps } from '../LayerGroup'
import FeatureGroup from '../FeatureGroup'
import { GeometryType, GeometryCollectionType, FeatureType, FeatureCollectionType } from './PropTypes'

export type JSONData = Geometry | Geometry[] | Feature | Feature[] | FeatureCollection

interface PartialProps {
  data: JSONData
}

type Props = Readonly<Partial<PartialProps>>

export default class GeoJSON<P extends L.GeoJSONOptions = L.GeoJSONOptions> extends FeatureGroup<L.GeoJSON, Props & P> {
  public static propTypes = {
    ...FeatureGroup.propTypes,
    data: PropTypes.oneOfType([
      GeometryType,
      GeometryCollectionType,
      PropTypes.arrayOf(PropTypes.oneOfType([GeometryType, GeometryCollectionType])),
      FeatureType,
      PropTypes.arrayOf(FeatureType),
      FeatureCollectionType
    ]),
    pointToLayer: PropTypes.func,
    style: PropTypes.oneOfType([PropTypes.shape(Path.propTypes), PropTypes.func]),
    onEachFeature: PropTypes.func,
    filter: PropTypes.func,
    coordsToLatLng: PropTypes.func
  }

  public static defaultProps = {
    pointToLayer (feature: Feature<GeoPoint, any>, position: L.LatLng) {
      return L.marker(position, { icon: defaultIcon })
    }
  }

  public constructor (props: LayerGroupProps & Props & P, context: ContextType) {
    super(props, context)
    this.instance.setZIndex(props.zIndex).setStyle(this.style)
  }

  public componentDidUpdate (prevProps: LayerGroupProps & Props & P): void {
    const { data: prevData, zIndex: prevZIndex } = prevProps
    const { data, zIndex } = this.props
    if (data !== prevData) {
      this.instance.clearLayers()
      this.instance.addData(data as any)
    }
    if (zIndex !== prevZIndex) {
      this.instance.setZIndex(zIndex)
    }
    this.instance.setStyle(this.style)
    super.componentDidUpdate(prevProps)
  }

  protected get style (): L.PathOptions {
    const { style } = this.props
    if (style) {
      if (typeof style === 'object') {
        return { ...this.theme, ...style }
      }
      return { ...this.theme, ...(style as L.StyleFunction)() }
    }
    return this.theme
  }

  protected createInstance (props: Props & P): L.GeoJSON {
    const { data, style, ...options } = props
    return L.geoJSON(data as any, options)
  }
}
