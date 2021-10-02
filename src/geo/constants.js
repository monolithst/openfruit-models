const { getObjToArray } = require('../utils')

const MAX_GEO_NAME = 50
const MAX_STREET_ADDRESS = 100


const MODEL_NAMES = getObjToArray([
  'GeoPoints',
  'Continents',
  'Countries',
  'Regions',
  'States',
  'Counties',
  'Cities',
  'Zipcodes',
  'Locations',
])

module.exports = {
  MAX_GEO_NAME,
  MAX_STREET_ADDRESS,
  MODEL_NAMES,
}
