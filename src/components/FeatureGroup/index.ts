import { Children, isValidElement, cloneElement } from 'react'
import L from 'leaflet'
import LayerGroup, { ChildProps as LayerGroupChildProps } from '../LayerGroup'

interface ChildProps extends L.PathOptions, LayerGroupChildProps {}

type Props = Readonly<L.PathOptions>

export default class FeatureGroup<T extends L.FeatureGroup = L.FeatureGroup, P extends L.LayerOptions = L.LayerOptions > extends LayerGroup<T, Props & P> {
  protected createInstance (props: Props & P): L.FeatureGroup {
    return L.featureGroup()
  }

  protected get theme (): L.PathOptions {
    if (this.context && this.context.theme && this.context.theme.path) {
      return this.context.theme.path
    }
    return {}
  }

  protected get pathOptions (): L.PathOptions {
    const { stroke, color, weight, opacity, lineCap, lineJoin, dashArray, dashOffset, fill, fillColor, fillOpacity, fillRule, renderer, className, interactive, bubblingMouseEvents, pane, attribution } = this.props
    return { stroke, color, weight, opacity, lineCap, lineJoin, dashArray, dashOffset, fill, fillColor, fillOpacity, fillRule, renderer, className, interactive, bubblingMouseEvents, pane, attribution }
  }

  public render (): React.ReactNode {
    const { zIndex, children } = this.props
    const group = this.instance
    return children ? Children.map(children, child => (isValidElement(child) ? cloneElement<ChildProps>(child as React.ReactElement, { zIndex, zIndexOffset: zIndex, ...this.theme, ...this.pathOptions, ...child.props, group, layer: group }) : child)) : null
  }
}
