import React from 'react'
import PropTypes from 'prop-types'
import L from 'leaflet'
import { Pixel, Point as PointType } from '../../util/PropTypes'
import { ContextType } from '../RCMap/Context'
import Context, { ContextType as State } from './Context'
import InteractiveLayer from '../InteractiveLayer'
import Content from './Content'
import { keepPrevHTML } from '../DivIcon'
import { defaultIcon } from '../DivIcon/creator'

interface RequiredProps {
  position: L.LatLngExpression
}

type Props = Readonly<RequiredProps & L.MarkerOptions>

export default class Point extends InteractiveLayer<L.Marker, Props, State> {
  public static propTypes = {
    ...InteractiveLayer.propTypes,
    position: PointType.isRequired,
    zIndexOffset: PropTypes.number,
    opacity: PropTypes.number,
    clickable: PropTypes.bool,
    draggable: PropTypes.bool,
    keyboard: PropTypes.bool,
    title: PropTypes.string,
    alt: PropTypes.string,
    riseOnHover: PropTypes.bool,
    riseOffset: PropTypes.number,
    autoPan: PropTypes.bool,
    autoPanSpeed: PropTypes.number,
    autoPanPadding: Pixel
  }

  public static Content = Content

  public constructor (props: Props, context: ContextType) {
    super(props, context)
    this.state = {
      instance: this.instance,
      icon: props.icon
    }
  }

  public static getDerivedStateFromProps (nextProps: Props, prevState: State): Partial<State> | null {
    const { icon: nextIcon } = nextProps
    const { instance, icon } = prevState
    if (nextIcon !== icon) {
      if (nextIcon instanceof L.DivIcon) {
        keepPrevHTML(instance as L.Marker, nextIcon)
      }
      return { icon: nextIcon }
    }
    return null
  }

  protected createInstance (props: Props): L.Marker {
    const { position, icon = defaultIcon, ...options } = props

    return L.marker(position, { ...options, icon })
  }

  public componentDidUpdate (prevProps: Props): void {
    const { position: prevPosition, zIndexOffset: prevZIndexOffset, opacity: prevOpacity } = prevProps
    const { position, zIndexOffset, opacity } = this.props
    const point = this.instance

    if (position !== prevPosition) {
      point.setLatLng(position)
    }
    if (zIndexOffset !== prevZIndexOffset) {
      point.setZIndexOffset(zIndexOffset)
    }
    if (opacity !== prevOpacity) {
      point.setOpacity(opacity)
    }
    super.componentDidUpdate(prevProps)
  }

  public render (): React.ReactNode {
    return (
      <Context.Provider value={this.state}>
        { super.render() }
      </Context.Provider>
    )
  }
}
