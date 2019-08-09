import PropTypes from 'prop-types'
import L from 'leaflet'
import * as Types from '../Util/PropTypes'
import creator, { defaultIcon } from './creator'
import BaseIcon, { Props as BaseIconProps } from '../BaseIcon'

type Props = Readonly<BaseIconProps & L.DivIconOptions>

interface State {
  instance: L.DivIcon
}

export const keepPrevHTML = (point: L.Marker, icon: L.DivIcon): void => {
  if (point) {
    const element = point.getElement()
    const html = element && element.lastElementChild
    point.setIcon(icon)
    if (html) {
      element.appendChild(html)
    }
  }
}

export default class DivIcon extends BaseIcon<L.DivIcon, Props> {
  public static propTypes = {
    ...BaseIcon.propTypes,
    html: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf<false>([false])]),
    bgPos: Types.Pixel,
    iconSize: Types.Pixel,
    iconAnchor: Types.Pixel,
    popupAnchor: Types.Pixel,
    className: PropTypes.string
  }

  public static getDerivedStateFromProps (nextProps: Props, prevState: State): State {
    const { layer, children, html, ...options } = nextProps
    let { instance: icon } = prevState

    icon = creator(options)
    keepPrevHTML(layer, icon)
    return { instance: icon }
  }

  public componentWillUnmount (): void {
    keepPrevHTML(this.props.layer, defaultIcon)
  }
}
