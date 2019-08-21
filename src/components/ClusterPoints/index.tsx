import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import React from 'react'
import PropTypes from 'prop-types'
import L from 'leaflet'
import 'leaflet.markercluster'
import { Icon, Point } from '../../util/PropTypes'
import { ContextType } from '../RCMap/Context'
import Layer from '../Layer'
import PointContext from '../Point/Context'
import { PolylinePropTypes } from '../Polyline'
import { defaultIcon } from '../DivIcon/creator'

type Icon = L.Icon | L.DivIcon

interface RequiredProps {
  points: L.LatLngExpression[]
}

interface PartialProps {
  icon: Icon
  clusterPane: string
  chunkProgress (processed?: number, total?: number, time?: number): void
}

type Props = Readonly<RequiredProps & Partial<PartialProps> & L.MarkerClusterGroupOptions>

export default class ClusterPoints extends Layer<L.MarkerClusterGroup, Props> {
  public static propTypes = {
    ...Layer.propTypes,
    points: PropTypes.arrayOf(Point).isRequired,
    icon: Icon,
    clusterPane: PropTypes.string,
    chunkProgress: PropTypes.func,
    showCoverageOnHover: PropTypes.bool,
    zoomToBoundsOnClick: PropTypes.bool,
    spiderfyOnMaxZoom: PropTypes.bool,
    removeOutsideVisibleBounds: PropTypes.bool,
    animate: PropTypes.bool,
    animateAddingMarkers: PropTypes.bool,
    disableClusteringAtZoom: PropTypes.number,
    maxClusterRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    polygonOptions: PropTypes.shape(PolylinePropTypes),
    singleMarkerMode: PropTypes.bool,
    spiderLegPolylineOptions: PropTypes.shape(PolylinePropTypes),
    spiderfyDistanceMultiplier: PropTypes.number,
    iconCreateFunction: PropTypes.func,
    chunkedLoading: PropTypes.bool,
    chunkDelay: PropTypes.number,
    chunkInterval: PropTypes.number
  }

  public static defaultProps: L.MarkerClusterGroupOptions = {
    disableClusteringAtZoom: 18,
    chunkedLoading: true
  }

  protected constructor (props: Props, context: ContextType) {
    super(props, context)

    this.instance.on('animationend', () => this.forceUpdate())
    this.instance.on('click', (e: L.LeafletEvent & { layer: L.Marker }) => e.layer.once('remove', () => this.instance.isPopupOpen() && this.instance.closePopup()))
    this.addPoints()
    context.map.addLayer(this.instance)
  }

  public componentDidUpdate (prevProps: Props): void {
    const { points: prevPoints, icon: prevIcon } = prevProps
    const { points, icon, children, ...options } = this.props

    Object.assign((this.instance as any).options, { ...this.getTheme(), ...options })
    if (points !== prevPoints || icon !== prevIcon) {
      this.instance.clearLayers()
      this.addPoints()
      this.forceUpdate()
    }
    super.componentDidUpdate(prevProps)
  }

  protected createInstance (props: Props): L.MarkerClusterGroup {
    const { points, icon, ...options } = props

    return L.markerClusterGroup(options)
  }

  protected getTheme (): object {
    if (this.context && this.context.theme && this.context.theme.path) {
      return { polygonOptions: this.context.theme.path }
    }
    return {}
  }

  private addPoints (): void {
    const { points, icon = defaultIcon } = this.props

    this.instance.addLayers(points.map(position => L.marker(position, { icon })))
  }

  public render (): React.ReactNode {
    const { icon = defaultIcon } = this.props

    return (
      <PointContext.Provider value={{ instance: this.instance, icon }}>
        { super.render() }
      </PointContext.Provider>
    )
  }
}
