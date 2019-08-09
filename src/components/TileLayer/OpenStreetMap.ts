import TileLayer, { Props } from './Component'

export default class OpenStreetMap extends TileLayer {
  public static defaultProps: Props = {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  }
}
