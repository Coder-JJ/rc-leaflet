import L from 'leaflet'
import iconUrl from '../../assets/images/point-default.png'
import shadowUrl from '../../assets/images/point-shadow.png'

const creator = (options: L.IconOptions): L.Icon => L.icon(options)

const defaultOptions: L.IconOptions = { iconUrl, shadowUrl, iconSize: [25, 41], iconAnchor: [13, 41], shadowSize: [41, 41], shadowAnchor: [13, 41], popupAnchor: [0, -45], tooltipAnchor: [0, -45] }

export default creator

export {
  defaultOptions
}
