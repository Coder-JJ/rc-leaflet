import React, { PureComponent, Children, isValidElement, cloneElement } from 'react'
import PropTypes from 'prop-types'
import L from 'leaflet'
import { Pixel } from '../../util/PropTypes'

interface PartialProps {
  layer: L.Marker
  children: React.ReactNode
}

export type Props = Readonly<Partial<PartialProps>>

export default abstract class BaseIcon<T extends L.Icon | L.DivIcon, P extends L.BaseIconOptions> extends PureComponent<Props & P, { instance: T }> {
  public static propTypes = {
    pane: PropTypes.string,
    attribution: PropTypes.string,
    iconUrl: PropTypes.string,
    iconRetinaUrl: PropTypes.string,
    iconSize: Pixel,
    iconAnchor: Pixel,
    popupAnchor: Pixel,
    tooltipAnchor: Pixel,
    shadowUrl: PropTypes.string,
    shadowRetinaUrl: PropTypes.string,
    shadowSize: Pixel,
    shadowAnchor: Pixel,
    className: PropTypes.string,
    layer: PropTypes.instanceOf(L.Marker),
    children: PropTypes.node
  }

  public readonly state: { instance: T } = {
    instance: undefined
  }

  public render (): React.ReactNode {
    const { children } = this.props
    const { instance: icon } = this.state

    return icon && children ? Children.map(children, child => (isValidElement(child) ? cloneElement<{ icon: T }>(child as React.ReactElement, { icon }) : child)) : null
  }
}
