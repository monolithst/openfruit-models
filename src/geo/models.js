const {
  NumberProperty,
  TextProperty,
  IntegerProperty,
  ReferenceProperty,
} = require('functional-models')
const { MAX_GEO_NAME, MAX_STREET_ADDRESS, MODEL_NAMES } = require('./constants')

const models = ({ Model, fetcher = undefined }) => {
  const GeoPoints = Model(MODEL_NAMES.GeoPoints, {
    lat: NumberProperty({ required: true }),
    lon: NumberProperty({ required: true }),
  })

  const Continents = Model(MODEL_NAMES.Continents, {
    name: TextProperty({ required: true, maxLength: MAX_GEO_NAME }),
  })

  const Countries = Model(MODEL_NAMES.Countries, {
    name: TextProperty({ required: true, maxLength: MAX_GEO_NAME }),
    continent: ReferenceProperty(Continents, {
      fetcher,
      required: true,
    }),
    abbreviation: TextProperty({ maxLength: 3 }),
    centerLatLon: ReferenceProperty(GeoPoints, { fetcher }),
  })

  const Regions = Model(MODEL_NAMES.Regions, {
    name: TextProperty({ required: true, maxLength: MAX_GEO_NAME }),
    country: ReferenceProperty(Countries, {
      fetcher,
      required: true,
    }),
    centerLatLon: ReferenceProperty(GeoPoints, { fetcher }),
  })

  const States = Model(MODEL_NAMES.States, {
    name: TextProperty({ required: true, maxLength: MAX_GEO_NAME }),
    country: ReferenceProperty(Countries, {
      fetcher,
      required: true,
    }),
    abbreviation: TextProperty({ maxLength: 3 }),
    centerLatLon: ReferenceProperty(GeoPoints, { fetcher }),
  })

  const Counties = Model(MODEL_NAMES.Counties, {
    name: TextProperty({ required: true, maxLength: MAX_GEO_NAME }),
    state: ReferenceProperty(States, { fetcher, required: true }),
    centerLatLon: ReferenceProperty(GeoPoints, { fetcher }),
  })

  const Cities = Model(MODEL_NAMES.Cities, {
    name: TextProperty({ required: true, maxLength: MAX_GEO_NAME }),
    state: ReferenceProperty(States, { fetcher, required: true }),
    county: ReferenceProperty(Counties, {
      fetcher,
      required: false,
    }),
    centerLatLon: ReferenceProperty(GeoPoints, { fetcher }),
  })

  const Zipcodes = Model(MODEL_NAMES.Zipcodes, {
    name: TextProperty({ required: true, maxLength: MAX_GEO_NAME }),
    city: ReferenceProperty(Cities, { fetcher, required: false }),
    zipcode: IntegerProperty({ minValue: 1, maxValue: 99999 }),
    timezone: IntegerProperty({ required: false }),
    centerLatLon: ReferenceProperty(GeoPoints, { fetcher }),
  })

  const Locations = Model(MODEL_NAMES.Locations, {
    country: ReferenceProperty(Countries, {
      fetcher,
      required: true,
    }),
    region: ReferenceProperty(Regions, {
      fetcher,
      required: false,
    }),
    state: ReferenceProperty(States, { fetcher, required: false }),
    county: ReferenceProperty(Counties, {
      fetcher,
      required: false,
    }),
    city: ReferenceProperty(Cities, { fetcher, required: false }),
    zipcode: ReferenceProperty(Zipcodes, {
      fetcher,
      required: false,
    }),
    specificPointLatLon: ReferenceProperty(GeoPoints, {
      fetcher,
      required: false,
    }),
    streetAddress: TextProperty({ maxLength: MAX_STREET_ADDRESS }),
    name: TextProperty({ maxLength: MAX_GEO_NAME }),
  })

  return {
    GeoPoints,
    Continents,
    Countries,
    Regions,
    States,
    Counties,
    Zipcodes,
    Cities,
    Locations,
  }
}

module.exports = models
