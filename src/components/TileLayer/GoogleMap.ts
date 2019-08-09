import TileLayer, { Props } from './Component'

export default class GoogleMap extends TileLayer {
  public static defaultProps: Props = {
    url: 'http://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    maxZoom: 20,
    subdomains: ['0', '1', '2', '3']
  }
}
