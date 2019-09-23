import { Children, isValidElement, cloneElement } from 'react'
import PropTypes from 'prop-types'
import L from 'leaflet'
import { Point, Pixel } from '../../util/PropTypes'
import { ContextType } from '../RCMap/Context'
import Layer from '../Layer'
import Popup from '../Popup'
import Tooltip from '../Tooltip'
import MassLayer, { EventTarget, MassLayerOptions } from './MassLayer'

type Props = Readonly<MassLayerOptions>

type State = Readonly<{
  clickPoint: EventTarget
  hoverPoint: EventTarget
}>

const Icon = {
  iconUrl: PropTypes.string,
  iconSize: Pixel,
  iconAnchor: Pixel,
  popupAnchor: Pixel,
  tooltipAnchor: Pixel
}

export {
  EventTarget,
  MassLayerOptions
}

export default class MassPoints extends Layer<MassLayer, Props, State> {
  public static propTypes = {
    ...Layer.propTypes,
    points: PropTypes.arrayOf(PropTypes.shape({ position: Point, ...Icon })).isRequired,
    ...Icon
  }

  protected constructor (props: Props, context: ContextType) {
    super(props, context)
    this.state = { clickPoint: undefined, hoverPoint: undefined }
    this.instance.on('click', this.onClick)
    this.instance.on('mouseover', this.onMouseOver)
    this.instance.on('mouseout', this.onMouseOut)
  }

  public componentDidUpdate (prevProps: Props): void {
    const { points: prevPoints, iconUrl: prevIconUrl, iconSize: prevIconSize, iconAnchor: prevIconAnchor, popupAnchor: prevPopupAnchor, tooltipAnchor: prevTooltipAnchor } = prevProps
    const { points, iconUrl, iconSize, iconAnchor, popupAnchor, tooltipAnchor } = this.props

    if (points !== prevPoints) {
      this.setState({ clickPoint: undefined, hoverPoint: undefined })
    }
    if (popupAnchor !== prevPopupAnchor) {
      this.instance.setPopupAnchor(popupAnchor)
    }
    if (tooltipAnchor !== prevTooltipAnchor) {
      this.instance.setTooltipAnchor(tooltipAnchor)
    }
    if (points !== prevPoints || iconUrl !== prevIconUrl || iconSize !== prevIconSize || iconAnchor !== prevIconAnchor) {
      this.instance.setOptions({ points, iconUrl, iconSize, iconAnchor })
    }
    super.componentDidUpdate(prevProps)
  }

  protected createInstance (props: Props): MassLayer {
    const { points, iconUrl, iconSize, iconAnchor, popupAnchor, tooltipAnchor } = props
    return new MassLayer({ points, iconUrl, iconSize, iconAnchor, popupAnchor, tooltipAnchor })
  }

  private onPopupClose = (): void => this.setState({ clickPoint: undefined })

  private onClick = (): void => this.setState(({ clickPoint, hoverPoint }) => ({ clickPoint: clickPoint === hoverPoint ? undefined : hoverPoint }))

  private onMouseOut = (): void => this.setState({ hoverPoint: undefined })

  private onMouseOver = (e: L.LeafletEvent & EventTarget): void => this.setState({ hoverPoint: { index: e.index, point: e.point } })

  public render (): React.ReactNode {
    const { children } = this.props
    const { clickPoint, hoverPoint } = this.state

    return children ? (
      Children.map(children, child => {
        if (isValidElement(child)) {
          let onClose: L.LeafletEventHandlerFn
          let target: EventTarget
          const type = child.type as any
          if (clickPoint && type === Popup) {
            onClose = this.onPopupClose
            target = clickPoint
          } else if (hoverPoint && type === Tooltip) {
            target = hoverPoint
          }
          return cloneElement<{ layer: MassLayer, target: EventTarget, onClose: L.LeafletEventHandlerFn }>(child as React.ReactElement, { layer: this.instance, target, onClose })
        }
        return child
      })
    ) : null
  }
}
