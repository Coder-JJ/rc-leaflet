import PropTypes from 'prop-types'
import L from 'leaflet'
import { Bounds } from '../../util/PropTypes'
import { ContextType } from '../RCMap/Context'
import InteractiveLayer from '../InteractiveLayer'

// this hack is used to open an unsticky tooltip when mouseover ImageOverlay
L.ImageOverlay.include({
  getCenter (this: L.ImageOverlay) {
    return this.getBounds().getCenter()
  }
})

interface RequiredProps {
  bounds: L.LatLngBoundsExpression
}

interface PartialProps {
  onLoad (e: L.LeafletEvent): void
  onError (e: L.LeafletEvent): void
}

export type Props = Readonly<Partial<PartialProps> & RequiredProps>

export default abstract class ImageOverlayClass<T extends L.Layer, P extends L.ImageOverlayOptions = L.ImageOverlayOptions> extends InteractiveLayer<T, Props & P> {
  public static propTypes = {
    ...InteractiveLayer.propTypes,
    bounds: Bounds.isRequired,
    onLoad: PropTypes.func,
    onError: PropTypes.func
  }

  public constructor (props: Props & P, context: ContextType) {
    super(props, context)
    const overlay = this.instance as any
    overlay.on({ load: this.onLoad, error: this.onError })
    overlay.setZIndex(props.zIndex)
  }

  public componentDidUpdate (prevProps: Props & P): void {
    const { bounds: prevBounds, opacity: prevOpacity, zIndex: prevZIndex } = prevProps
    const { bounds, opacity, zIndex } = this.props
    const overlay = this.instance as any

    if (bounds !== prevBounds) {
      overlay.setBounds(bounds instanceof L.LatLngBounds ? bounds : new L.LatLngBounds(bounds as L.LatLngBoundsLiteral))
    }
    if (opacity !== prevOpacity) {
      overlay.setOpacity(opacity)
    }
    if (zIndex !== prevZIndex) {
      overlay.setZIndex(zIndex)
    }
    super.componentDidUpdate(prevProps)
  }

  private onLoad = (e: L.LeafletEvent): void => this.props.onLoad && this.props.onLoad(e)

  private onError = (e: L.LeafletEvent): void => this.props.onError && this.props.onError(e)
}
