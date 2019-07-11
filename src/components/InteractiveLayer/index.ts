import PropTypes from 'prop-types'
import L from 'leaflet'
import Layer from '../Layer'

export default abstract class InteractiveLayer<T extends L.Layer, P extends L.InteractiveLayerOptions> extends Layer<T, P> {
  protected static propTypes = {
    ...Layer.propTypes,
    interactive: PropTypes.bool,
    bubblingMouseEvents: PropTypes.bool
  }
}
