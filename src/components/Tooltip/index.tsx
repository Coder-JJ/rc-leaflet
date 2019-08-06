import PropTypes from 'prop-types'
import L from 'leaflet'
import { Types } from '../../config'
import DivOverlay from '../DivOverlay'

export default class Tooltip extends DivOverlay<L.Tooltip, L.TooltipOptions> {
  public static propTypes = {
    ...DivOverlay.propTypes,
    pane: PropTypes.string,
    offset: Types.Pixel,
    direction: PropTypes.oneOf<L.Direction>(['right', 'left', 'top', 'bottom', 'center', 'auto']),
    permanent: PropTypes.bool,
    sticky: PropTypes.bool,
    interactive: PropTypes.bool,
    opacity: PropTypes.number
  }

  public static defaultProps: L.TooltipOptions = {
    direction: 'top'
  }

  protected createInstance (props: L.TooltipOptions): L.Tooltip {
    return L.tooltip(props)
  }

  protected bindOnLayer (layer: L.Layer): void {
    if (layer) {
      layer.bindTooltip(this.instance)
    }
  }

  protected unbindOnLayer (layer: L.Layer): void {
    if (layer) {
      layer.unbindTooltip()
    }
  }

  protected openOnMap (): void {
    if (this.context.map) {
      this.context.map.openTooltip(this.instance)
    }
  }

  protected closeOnMap (): void {
    if (this.context.map) {
      this.context.map.closeTooltip(this.instance)
    }
  }
}
