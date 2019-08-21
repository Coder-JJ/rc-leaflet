import React, { PureComponent } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import L from 'leaflet'
import { Pixel, Point } from '../../util/PropTypes'
import Context, { ContextType } from '../RCMap/Context'

interface PartialProps {
  layer: L.Layer
  position: L.LatLngExpression
  children: React.ReactNode
  onOpen: L.LeafletEventHandlerFn
  onClose: L.LeafletEventHandlerFn
}

type Props = Readonly<Partial<PartialProps>>

export default abstract class DivOverlay<T extends L.Popup | L.Tooltip, P extends L.PopupOptions | L.TooltipOptions> extends PureComponent<Props & P> {
  public static propTypes = {
    offset: Pixel,
    zoomAnimation: PropTypes.bool,
    className: PropTypes.string,
    pane: PropTypes.string,
    layer: PropTypes.instanceOf(L.Layer),
    position: Point,
    children: PropTypes.node,
    onOpen: PropTypes.func,
    onClose: PropTypes.func
  }

  public static contextType = Context

  public context: ContextType

  protected instance: T

  protected constructor (props: Props & P, context: ContextType) {
    super(props, context)
    const { layer, position, children, onOpen, onClose, ...options } = props

    this.instance = this.createInstance(options as P, context)
    this.instance.on({ add: this.onOpen, remove: this.onClose })
  }

  public componentDidMount (): void {
    const { layer, position } = this.props
    const overlay = this.instance

    if (layer) {
      this.bindOnLayer(layer)
    } else if (position) {
      overlay.setLatLng(position)
      if (this.context.map) {
        this.openOnMap()
      }
    }
  }

  public componentDidUpdate (prevProps: Props & P): void {
    const { layer: prevLayer, position: prevPosition } = prevProps
    const { layer, position, onOpen, onClose, children, ...options } = this.props
    const overlay = this.instance

    if (prevLayer) {
      if (layer !== prevLayer) {
        this.unbindOnLayer(prevLayer)
      }
    } else if (this.context.map && prevPosition && !position) {
      this.closeOnMap()
    }
    this.update(options as P)
    if (layer) {
      if (layer !== prevLayer) {
        this.bindOnLayer(layer)
      }
    } else if (position) {
      overlay.setLatLng(position)
      if (this.context.map && !overlay.isOpen()) {
        this.openOnMap()
      }
    }
  }

  public componentWillUnmount (): void {
    this.instance.remove()
  }

  protected abstract createInstance (props: P, context: ContextType): T

  protected abstract bindOnLayer (layer: L.Layer): void

  protected abstract unbindOnLayer (layer: L.Layer): void

  protected abstract openOnMap (): void

  protected abstract closeOnMap (): void

  private onOpen = (e: L.LeafletEvent): void => {
    const { onOpen } = this.props

    this.forceUpdate(() => onOpen && onOpen(e))
  }

  private onClose = (e: L.LeafletEvent): void => {
    const { onClose } = this.props

    if (onClose) {
      onClose(e)
    }
  }

  private update (options: P): void {
    const overlay = this.instance

    for (const [key, value] of Object.entries(options)) {
      if (value !== overlay.options[key]) {
        overlay.options[key] = value
      }
    }
    overlay.update()
  }

  public render (): React.ReactNode {
    const { children } = this.props
    const overlay = this.instance as { _contentNode?: Element }

    return overlay._contentNode ? createPortal(children, overlay._contentNode) : null
  }
}
