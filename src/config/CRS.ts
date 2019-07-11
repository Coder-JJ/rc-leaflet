import L from 'leaflet'
import 'proj4leaflet'
// import 'leaflet.chinatmsproviders'

export default {
  BMap: new L.Proj.CRS(
    'EPSG:900913',
    '+proj=merc +a=6378206 +b=6356584.314245179 +lat_ts=0.0 +lon_0=0.0 +x_0=0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs',
    {
      resolutions: Array(19).fill(0).map((el, i) => Math.pow(2, 18 - i)),
      origin: [0, 0],
      bounds: L.bounds([20037508.342789244, 0], [0, 20037508.342789244])
    }
  ),
  AMap: L.CRS.EPSG3857
}
