import TileLayer, { Props } from './Component'

export default class BMap extends TileLayer {
  public static defaultProps: Props = {
    url: 'http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=pl&udt=20150518',
    tms: true,
    subdomains: ['0', '1', '2']
  }
}
