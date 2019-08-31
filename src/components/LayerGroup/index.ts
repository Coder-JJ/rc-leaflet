import { Children, isValidElement, cloneElement } from 'react'
import PropTypes from 'prop-types'
import L from 'leaflet'
import Layer from '../Layer'

interface PartialProps {
  zIndex: number
}

export interface ChildProps extends PartialProps {
  group: L.LayerGroup
  layer: L.LayerGroup
  zIndexOffset: number
}

export type Props = Readonly<Partial<PartialProps>>

export default class LayerGroup<T extends L.LayerGroup = L.LayerGroup, P extends L.LayerOptions = L.LayerOptions> extends Layer<T, Props & P> {
  public static propTypes = {
    ...Layer.propTypes,
    zIndex: PropTypes.number
  }

  protected createInstance (props: Props & P): any {
    return L.layerGroup()
  }

  public render (): React.ReactNode {
    const { zIndex, children } = this.props
    const group = this.instance
    return children ? Children.map(children, child => (isValidElement(child) ? cloneElement<ChildProps>(child as React.ReactElement, { zIndex, zIndexOffset: zIndex, ...child.props, group, layer: group }) : child)) : null
  }
}
