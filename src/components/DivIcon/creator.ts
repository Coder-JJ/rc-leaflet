import './default.css'
import L from 'leaflet'
import baseOptions from '../BaseIcon/options'

const defaultOptions: L.DivIconOptions = {
  className: 'rc-leaflet-icon-default',
  ...baseOptions
}

const creator = (options: L.DivIconOptions): L.DivIcon => {
  if (!options.className || options.className === defaultOptions.className) {
    return L.divIcon({ ...defaultOptions, ...options })
  }
  return L.divIcon(options)
}

const defaultIcon = creator(defaultOptions)

export default creator

export {
  defaultIcon
}
