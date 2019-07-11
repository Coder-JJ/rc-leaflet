import React, { PureComponent, Children, isValidElement, cloneElement } from 'react'
import PropTypes from 'prop-types'
import L from 'leaflet'
import { Types } from '../../config'
import { defaultIcon } from '../DivIcon/creator'

interface PartialProps {
  layer: L.Marker
  children: React.ReactNode
}

export type Props = Readonly<Partial<PartialProps>>

export default abstract class BaseIcon<T extends L.Icon | L.DivIcon, P extends L.BaseIconOptions> extends PureComponent<Props & P, { instance: T }> {
  protected static propTypes = {
    ...Types.LayerOptionsShape,
    iconUrl: PropTypes.string,
    iconRetinaUrl: PropTypes.string,
    iconSize: Types.Pixel,
    iconAnchor: Types.Pixel,
    popupAnchor: Types.Pixel,
    tooltipAnchor: Types.Pixel,
    shadowUrl: PropTypes.string,
    shadowRetinaUrl: PropTypes.string,
    shadowSize: Types.Pixel,
    shadowAnchor: Types.Pixel,
    className: PropTypes.string,
    layer: PropTypes.instanceOf(L.Marker),
    children: PropTypes.node
  }

  protected static defaultProps: PartialProps = {
    layer: null,
    children: null
  }

  public readonly state: { instance: T }

  protected constructor (props: Props & P) {
    super(props)

    const { layer, children, ...options } = props

    this.state = {
      instance: this.createInstance(options as P)
    }
    if (layer) {
      layer.setIcon(this.state.instance)
    }
  }

  public componentDidUpdate (prevProps: Props & P, prevState: { instance: T }): void {
    const { layer: prevLayer } = prevProps
    const { layer, children, ...options } = this.props
    const { instance: prevIcon } = prevState
    const { instance: icon } = this.state

    if (icon === prevIcon) {
      const instance = this.createInstance(options as P)

      if (layer !== prevLayer && prevLayer) {
        prevLayer.setIcon(defaultIcon)
      }
      if (layer) {
        layer.setIcon(instance)
      }
      this.setState({ instance })
    }
  }

  public componentWillUnmount (): void {
    const { layer } = this.props

    if (layer) {
      layer.setIcon(defaultIcon)
    }
  }

  protected abstract createInstance (options: P): T

  public render (): React.ReactNode {
    const { children } = this.props
    const { instance: icon } = this.state

    return icon && children ? Children.map(children, child => (isValidElement(child) ? cloneElement<{ icon: T }>(child as React.ReactElement, { icon }) : child)) : null
  }
}
