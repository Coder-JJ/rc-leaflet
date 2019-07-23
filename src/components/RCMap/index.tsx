import 'leaflet/dist/leaflet.css'
import './index.css'
import React, { PureComponent, createContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { ClassValue } from 'classnames/types'
import L from 'leaflet'
import { Types } from '../../config'
import { Theme, ThemeContext, ThemeContextType } from '../Theme'

interface PartialProps {
  className: ClassValue
  flyToBounds: boolean
  bounds: L.LatLngBoundsExpression
  boundsOptions: L.FitBoundsOptions
  children: React.ReactNode
  onZoom: L.LeafletEventHandlerFn
  onZoomStart: L.LeafletEventHandlerFn
  onZoomEnd: L.LeafletEventHandlerFn
  onInit (map: L.Map): void
}

type Props = Readonly<Partial<PartialProps> & L.MapOptions>

type State = Readonly<{
  map: L.Map
  theme: Theme
}>

export const Context = createContext<State>(null)

export type ContextType = React.ContextType<typeof Context>

export default class RCMap extends PureComponent<Props, State> {
  protected static propTypes = {
    className: Types.ClassValue,
    preferCanvas: PropTypes.bool,
    attributionControl: PropTypes.bool,
    zoomControl: PropTypes.bool,
    closePopupOnClick: PropTypes.bool,
    zoomSnap: PropTypes.number,
    zoomDelta: PropTypes.number,
    trackResize: PropTypes.bool,
    boxZoom: PropTypes.bool,
    doubleClickZoom: Types.Zoom,
    dragging: PropTypes.bool,
    crs: Types.CRS,
    center: Types.Point,
    zoom: PropTypes.number,
    minZoom: PropTypes.number,
    maxZoom: PropTypes.number,
    layers: PropTypes.arrayOf(PropTypes.instanceOf(L.Layer)),
    maxBounds: Types.Bounds,
    renderer: PropTypes.instanceOf(L.Renderer),
    zoomAnimation: PropTypes.bool,
    zoomAnimationThreshold: PropTypes.number,
    fadeAnimation: PropTypes.bool,
    markerZoomAnimation: PropTypes.bool,
    transform3DLimit: PropTypes.number,
    inertia: PropTypes.bool,
    inertiaDeceleration: PropTypes.number,
    inertiaMaxSpeed: PropTypes.number,
    easeLinearity: PropTypes.number,
    worldCopyJump: PropTypes.bool,
    maxBoundsViscosity: PropTypes.number,
    keyboard: PropTypes.bool,
    keyboardPanDelta: PropTypes.number,
    scrollWheelZoom: Types.Zoom,
    wheelDebounceTime: PropTypes.number,
    wheelPxPerZoomLevel: PropTypes.number,
    tap: PropTypes.bool,
    tapTolerance: PropTypes.number,
    touchZoom: Types.Zoom,
    bounceAtZoomLimits: PropTypes.bool,
    flyToBounds: PropTypes.bool,
    bounds: Types.Bounds,
    boundsOptions: Types.BoundsOptions,
    children: PropTypes.node,
    onZoom: PropTypes.func,
    onZoomStart: PropTypes.func,
    onZoomEnd: PropTypes.func,
    onInit: PropTypes.func
  }

  protected static defaultProps: Props = {
    className: undefined,
    attributionControl: false,
    zoomControl: false,
    zoom: 15,
    minZoom: 1,
    maxZoom: 18,
    flyToBounds: true,
    bounds: undefined,
    boundsOptions: undefined,
    children: null
  }

  public static contextType = ThemeContext

  public context: ThemeContextType

  public readonly state: State = {
    map: null,
    theme: null
  }

  private ref = React.createRef<HTMLDivElement>()

  public componentDidMount (): void {
    const { center, flyToBounds, bounds, boundsOptions, onZoom, onZoomStart, onZoomEnd, onInit, ...options } = this.props

    const map = L.map(this.ref.current, options)
    if (bounds) {
      if (center && flyToBounds) {
        map.flyToBounds(bounds, boundsOptions)
      } else {
        map.fitBounds(bounds, boundsOptions)
      }
    } else if (center) {
      map.panTo(center)
    }
    map.on({ zoom: this.onZoom, zoomstart: this.onZoomStart, zoomend: this.onZoomEnd })
    onInit && onInit(map)
    this.setState({ map, theme: this.context })
  }

  public componentDidUpdate (prevProps: Props): void {
    const { center: prevCenter, zoom: prevZoom, minZoom: prevMinZoom, maxZoom: prevMaxZoom, layers: prevLayers, maxBounds: prevMaxBounds, bounds: prevBounds } = prevProps
    const { className, center, zoom, minZoom, maxZoom, layers, maxBounds, flyToBounds, bounds, boundsOptions, children, onZoom, onZoomStart, onZoomEnd, onInit, ...options } = this.props
    const { map, theme } = this.state

    Object.assign(map.options, options)
    if (layers !== prevLayers) {
      if (prevLayers && prevLayers.length) {
        for (const layer of prevLayers) {
          map.removeLayer(layer)
        }
      }
      if (layers && layers.length) {
        for (const layer of layers) {
          map.addLayer(layer)
        }
      }
    }
    if (minZoom && minZoom !== prevMinZoom) {
      map.setMinZoom(minZoom)
    }
    if (maxZoom && maxZoom !== prevMaxZoom) {
      map.setMaxZoom(maxZoom)
    }
    if (zoom && zoom !== prevZoom) {
      map.setZoom(zoom)
    }
    if (maxBounds !== prevMaxBounds) {
      map.setMaxBounds(maxBounds)
    }
    if (bounds && bounds !== prevBounds) {
      if (prevCenter && flyToBounds) {
        map.flyToBounds(bounds, boundsOptions)
      } else {
        map.fitBounds(bounds, boundsOptions)
      }
    } else if (center && center !== prevCenter) {
      map.panTo(center)
    }
    if (theme !== this.context) {
      this.setState({ theme: this.context })
    }
  }

  public componentWillUnmount (): void {
    const { map } = this.state

    if (map) {
      map.remove()
    }
  }

  private onZoom = (e: L.LeafletEvent): void => this.props.onZoom && this.props.onZoom(e)

  private onZoomStart = (e: L.LeafletEvent): void => this.props.onZoomStart && this.props.onZoomStart(e)

  private onZoomEnd = (e: L.LeafletEvent): void => this.props.onZoomEnd && this.props.onZoomEnd(e)

  public render (): React.ReactNode {
    const { className, children } = this.props
    const context = this.state

    return (
      <Context.Provider value={context}>
        <div className={classNames('rc-leaflet-wrap', className)}>
          <div className={'rc-leaflet-ref'} ref={this.ref} />
          { context.map ? children : null }
        </div>
      </Context.Provider>
    )
  }
}
