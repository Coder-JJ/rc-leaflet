import './default.css'
import L from 'leaflet'

const creator = (options: L.DivIconOptions): L.DivIcon => L.divIcon(options)

const defaultOptions: L.DivIconOptions = { className: 'rc-leaflet-icon-default', iconSize: null, iconAnchor: [13, 41], popupAnchor: [0, -45], tooltipAnchor: [0, -45] }
const defaultIcon = creator(defaultOptions)

export default creator

export {
  defaultOptions,
  defaultIcon
}
