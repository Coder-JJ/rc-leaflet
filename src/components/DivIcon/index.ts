import PropTypes from 'prop-types'
import L from 'leaflet'
import { Pixel } from '../../util/PropTypes'
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
    bgPos: Pixel,
    iconSize: Pixel,
    iconAnchor: Pixel,
    popupAnchor: Pixel,
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
