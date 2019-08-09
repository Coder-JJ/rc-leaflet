import TileLayer, { Props } from './Component'

export default class AMap extends TileLayer {
  public static defaultProps: Props = {
    url: 'http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
    subdomains: ['1', '2', '3', '4']
  }
}
