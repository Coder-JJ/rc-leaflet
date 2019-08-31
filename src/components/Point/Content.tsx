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

const isTargetPoint = (layer: L.Layer): layer is L.Marker => {
  if (!layer) {
    return false
  }
  const point = layer as L.Marker
  const icon = point.getIcon && point.getIcon()
  const element = point.getElement && point.getElement()
  return icon && element && icon instanceof L.DivIcon
}

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
      if (isTargetPoint(layer)) {
        return createPortal(<div className={className} {...props}>{ children }</div>, layer.getElement())
      } else if (layer instanceof L.LayerGroup) {
        const points = layer.getLayers().filter<L.Marker>(isTargetPoint)
        return points.map(point => createPortal(<div className={className} {...props}>{ children }</div>, point.getElement()))
      }
    }
    return null
  }
}
