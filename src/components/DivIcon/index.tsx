import PropTypes from 'prop-types'
import L from 'leaflet'
import { Types } from '../../config'
import creator, { defaultOptions } from './creator'
import BaseIcon, { Props as BaseIconProps } from '../BaseIcon'

type Props = Readonly<BaseIconProps & L.DivIconOptions>

export default class DivIcon extends BaseIcon<L.DivIcon, Props> {
  protected static propTypes = {
    ...BaseIcon.propTypes,
    html: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([false])]),
    bgPos: Types.Pixel,
    iconSize: Types.Pixel,
    iconAnchor: Types.Pixel,
    popupAnchor: Types.Pixel,
    className: PropTypes.string
  }

  protected static defaultProps = {
    ...BaseIcon.defaultProps,
    ...defaultOptions
  }

  protected createInstance (options: L.DivIconOptions): L.DivIcon {
    return creator(options)
  }
}
