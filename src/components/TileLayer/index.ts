import TileLayer from './Component'
import BMap from './BMap'
import AMap from './AMap'
import OpenStreetMap from './OpenStreetMap'
import GoogleMap from './GoogleMap'

export default class extends TileLayer {
  public static BMap = BMap

  public static AMap = AMap

  public static OpenStreetMap = OpenStreetMap

  public static GoogleMap = GoogleMap
}
