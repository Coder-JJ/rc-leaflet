import 'leaflet/dist/leaflet.css'
import './index.css'
import React, { Component, createContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { ClassValue } from 'classnames/types'
import L from 'leaflet'
import { Types } from '../../config'
import { Theme, ThemeContext, ThemeContextType } from '../Theme'

type Instance = L.Map | null

interface PartialProps {
  className: ClassValue
  center: L.LatLngExpression
  crs: L.CRS
  layers: L.Layer[]
  minZoom: number
  maxZoom: number
  zoom: number
  flyToBounds: boolean
  bounds: L.LatLngBoundsExpression
  boundsOptions: L.FitBoundsOptions
  maxBounds: L.LatLngBoundsExpression
  children: React.ReactNode
  onInit (map: L.Map): void
}

type Props = Readonly<Partial<PartialProps>>

type State = Readonly<{
  map: Instance
  theme: Theme
}>

export const Context = createContext<State>(null)

export type ContextType = React.ContextType<typeof Context>

export default class RCMap extends Component<Props, State> {
  protected static propTypes = {
    className: Types.ClassValue,
    center: Types.Point,
    crs: Types.CRS,
    layers: PropTypes.arrayOf(PropTypes.instanceOf(L.Layer)),
    minZoom: PropTypes.number,
    maxZoom: PropTypes.number,
    zoom: PropTypes.number,
    flyToBounds: PropTypes.bool,
    bounds: Types.Bounds,
    boundsOptions: Types.BoundsOptions,
    maxBounds: Types.Bounds,
    children: PropTypes.node,
    onInit: PropTypes.func
  }

  protected static defaultProps: PartialProps = {
    className: undefined,
    center: undefined,
    crs: L.CRS.EPSG3857,
    layers: [],
    minZoom: 1,
    maxZoom: 18,
    zoom: 15,
    flyToBounds: true,
    bounds: undefined,
    boundsOptions: undefined,
    maxBounds: undefined,
    children: null,
    onInit (map: L.Map) {}
  }

  public static contextType = ThemeContext

  public context: ThemeContextType

  public readonly state: State = {
    map: null,
    theme: null
  }

  private ref = React.createRef<HTMLDivElement>()

  public componentDidMount (): void {
    if (this.ref.current) {
      const { crs, layers, center, minZoom, maxZoom, zoom, flyToBounds, bounds, boundsOptions, maxBounds, onInit } = this.props

      const map = L.map(this.ref.current, {
        crs,
        layers,
        zoom,
        minZoom,
        maxZoom,
        zoomSnap: 1,
        zoomControl: false
      })

      if (maxBounds) {
        map.setMaxBounds(maxBounds)
      }
      if (center) {
        map.panTo(center)
      }
      if (bounds) {
        if (flyToBounds) {
          map.flyToBounds(bounds, boundsOptions)
        } else {
          map.fitBounds(bounds, boundsOptions)
        }
      }
      onInit(map)
      this.setState({ map, theme: this.context })
    }
  }

  public shouldComponentUpdate (nextProps: Props, nextState: State, nextContext: ThemeContextType): boolean {
    const { layers, center, minZoom, maxZoom, zoom, bounds, maxBounds, children } = this.props
    const { layers: nextLayers, center: nextCenter, minZoom: nextMinZoom, maxZoom: nextMaxZoom, zoom: nextZoom, bounds: nextBounds, maxBounds: nextMaxBounds, children: nextChildren } = nextProps
    const { map, theme } = this.state
    const { map: nextMap, theme: nextTheme } = nextState
    const context = this.context

    return layers !== nextLayers || center !== nextCenter || minZoom !== nextMinZoom || maxZoom !== nextMaxZoom || zoom !== nextZoom || bounds !== nextBounds || maxBounds !== nextMaxBounds || children !== nextChildren || map !== nextMap || theme !== nextTheme || context !== nextContext
  }

  public componentDidUpdate (prevProps: Props): void {
    const { layers: prevLayers, center: prevCenter, minZoom: prevMinZoom, maxZoom: prevMaxZoom, zoom: prevZoom, bounds: prevBounds, maxBounds: prevMaxBounds } = prevProps
    const { layers, center, minZoom, maxZoom, zoom, flyToBounds, bounds, boundsOptions, maxBounds } = this.props
    const { map, theme } = this.state

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
    if (maxBounds && maxBounds !== prevMaxBounds) {
      map.setMaxBounds(maxBounds)
    }
    if (center && center !== prevCenter) {
      map.panTo(center)
    }
    if (bounds && bounds !== prevBounds) {
      if (flyToBounds) {
        map.flyToBounds(bounds, boundsOptions)
      } else {
        map.fitBounds(bounds, boundsOptions)
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
