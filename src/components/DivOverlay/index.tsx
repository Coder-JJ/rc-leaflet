import React, { PureComponent } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import L from 'leaflet'
import { Types } from '../../config'
import { Context, ContextType } from '../RCMap'

interface PartialProps {
  layer: L.Layer
  position: L.LatLngExpression
  children: React.ReactNode
  onOpen: L.LeafletEventHandlerFn
  onClose: L.LeafletEventHandlerFn
}

type Props = Readonly<Partial<PartialProps>>

export default abstract class DivOverlay<T extends L.Popup | L.Tooltip, P extends L.PopupOptions | L.TooltipOptions> extends PureComponent<Props & P> {
  protected static propTypes = {
    offset: Types.Pixel,
    zoomAnimation: PropTypes.bool,
    className: PropTypes.string,
    pane: PropTypes.string,
    layer: PropTypes.instanceOf(L.Layer),
    position: Types.Point,
    children: PropTypes.node,
    onOpen: PropTypes.func,
    onClose: PropTypes.func
  }

  protected static defaultProps: Props = {
    layer: null,
    position: undefined,
    children: null,
    onOpen: null,
    onClose: null
  }

  public static contextType = Context

  public context: ContextType

  protected instance: T

  protected constructor (props: Props & P) {
    super(props)

    const { layer, position, children, onOpen, onClose, ...options } = props
    const overlay = this.createInstance(options as P)

    overlay.on({ add: this.onOpen, remove: this.onClose })
    if (layer) {
      this.bindOnLayer(layer)
    }
    this.instance = overlay
  }

  public componentDidMount (): void {
    const { layer, position } = this.props
    const overlay = this.instance

    if (!layer && position) {
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

    if (this.context.map && !prevLayer && prevPosition && !position) {
      this.closeOnMap()
    }
    this.update(options as P)
    if (!layer && position) {
      overlay.setLatLng(position)
      if (this.context.map && !overlay.isOpen()) {
        this.openOnMap()
      }
    }
  }

  public componentWillUnmount (): void {
    this.instance.remove()
  }

  protected abstract createInstance (props: P): T

  protected abstract bindOnLayer (layer: L.Layer): void

  protected abstract openOnMap (): void

  protected abstract closeOnMap (): void

  private onOpen = (e: L.LeafletEvent): void => {
    const { onOpen } = this.props as { onOpen?: L.LeafletEventHandlerFn }

    this.forceUpdate(() => onOpen && onOpen(e))
  }

  private onClose = (e: L.LeafletEvent): void => {
    const { onClose } = this.props as { onClose?: L.LeafletEventHandlerFn }

    if (onClose) {
      onClose(e)
    }
  }

  private update (options: P): void {
    const overlay = this.instance

    let shouldUpdate = false
    for (const [key, value] of Object.entries(options)) {
      if (value !== overlay.options[key]) {
        shouldUpdate = true
        overlay.options[key] = value
      }
    }
    if (shouldUpdate) {
      overlay.update()
    }
  }

  public render (): React.ReactNode {
    const { children } = this.props
    const overlay = this.instance as { _contentNode?: Element }

    if (children && overlay._contentNode) {
      return createPortal(children, overlay._contentNode)
    }
    return null
  }
}
