import PropTypes from 'prop-types'

const PointType = PropTypes.shape({
  type: PropTypes.oneOf(['Point']).isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired
})
const MultiPointType = PropTypes.shape({
  type: PropTypes.oneOf(['MultiPoint']).isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
})
const LineStringType = PropTypes.shape({
  type: PropTypes.oneOf(['LineString']).isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
})
const MultiLineStringType = PropTypes.shape({
  type: PropTypes.oneOf(['MultiLineString']).isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))).isRequired
})
const PolygonType = PropTypes.shape({
  type: PropTypes.oneOf(['Polygon']).isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))).isRequired
})
const MultiPolygonType = PropTypes.shape({
  type: PropTypes.oneOf(['MultiPolygon']).isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)))).isRequired
})

const GeometryType = PropTypes.oneOfType([PointType, MultiPointType, LineStringType, MultiLineStringType, PolygonType, MultiPolygonType])
const GeometryCollectionType = PropTypes.shape({
  type: PropTypes.oneOf(['GeometryCollection']).isRequired,
  coordinates: PropTypes.arrayOf(GeometryType).isRequired
})
const FeatureType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.oneOf(['Feature']).isRequired,
  geometry: PropTypes.oneOfType([GeometryType, GeometryCollectionType]).isRequired,
  properties: PropTypes.object
})
const FeatureCollectionType = PropTypes.shape({
  type: PropTypes.oneOf(['FeatureCollection']).isRequired,
  features: PropTypes.arrayOf(FeatureType).isRequired
})

export {
  GeometryType,
  GeometryCollectionType,
  FeatureType,
  FeatureCollectionType
}
