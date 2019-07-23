import L from 'leaflet'
import baseOptions from '../BaseIcon/options'
import iconUrl from '../../assets/images/point-default.png'
import shadowUrl from '../../assets/images/point-shadow.png'

const defaultOptions: L.IconOptions = {
  iconUrl,
  shadowUrl,
  ...baseOptions,
  shadowSize: [41, 41],
  shadowAnchor: [12, 41]
}

const creator = (options: L.IconOptions): L.Icon => {
  if (!options.iconUrl || options.iconUrl === iconUrl) {
    return L.icon({ ...defaultOptions, ...options })
  }
  return L.icon(options)
}

export default creator

export {
  defaultOptions
}
