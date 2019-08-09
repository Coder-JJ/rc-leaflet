import React, { PureComponent } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import L from 'leaflet'
import Context, { ContextType } from './Context'

interface PartialProps {
  className: string
  [key: string]: any
}

type Props = Readonly<Partial<PartialProps>>

export default class Content extends PureComponent<Props> {
  public static propTypes = {
    children: PropTypes.node
  }

  public static contextType = Context

  public context: ContextType

  public render (): React.ReactNode {
    const { className, children, ...props } = this.props
    const layer = this.context && this.context.instance

    if (layer) {
      if (layer instanceof L.Marker && layer.getIcon() instanceof L.DivIcon && layer.getElement()) {
        return createPortal(<div className={className} {...props}>{ children }</div>, layer.getElement())
      } else if (layer instanceof L.LayerGroup) {
        const points = layer.getLayers().filter(el => el instanceof L.Marker && el.getIcon() instanceof L.DivIcon && el.getElement()) as L.Marker[]
        return points.map(point => createPortal(<div className={className} {...props}>{ children }</div>, point.getElement()))
      }
    }
    return null
  }
}
