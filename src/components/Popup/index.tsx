import PropTypes from 'prop-types'
import L from 'leaflet'
import { Types } from '../../config'
import DivOverlay from '../DivOverlay'

export default class Popup extends DivOverlay<L.Popup, L.PopupOptions> {
  protected static propTypes = {
    ...DivOverlay.propTypes,
    maxWidth: PropTypes.number,
    minWidth: PropTypes.number,
    maxHeight: PropTypes.number,
    keepInView: PropTypes.bool,
    closeButton: PropTypes.bool,
    autoPan: PropTypes.bool,
    autoPanPaddingTopLeft: Types.Pixel,
    autoPanPaddingBottomRight: Types.Pixel,
    autoPanPadding: Types.Pixel,
    autoClose: PropTypes.bool,
    closeOnClick: PropTypes.bool,
    closeOnEscapeKey: PropTypes.bool
  }

  protected static defaultProps: L.PopupOptions = {
    pane: 'popupPane',
    closeOnClick: true,
    zoomAnimation: true
  }

  protected createInstance (props: L.PopupOptions): L.Popup {
    return L.popup(props)
  }

  protected bindOnLayer (layer: L.Layer): void {
    if (layer) {
      layer.bindPopup(this.instance)
    }
  }

  protected openOnMap (): void {
    if (this.context.map) {
      this.context.map.openPopup(this.instance)
    }
  }

  protected closeOnMap (): void {
    if (this.context.map) {
      this.context.map.closePopup(this.instance)
    }
  }
}
