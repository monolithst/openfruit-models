const {
  NumberProperty,
  TextProperty,
  IntegerProperty,
  ReferenceProperty,
} = require('functional-models')
const { MAX_GEO_NAME, MAX_STREET_ADDRESS, MODEL_NAMES } = require('./constants')

const models = ({
  OpenFruitModel,
  fetchContinent = undefined,
  fetchLatLon = undefined,
  fetchCountry = undefined,
  fetchRegion = undefined,
  fetchState = undefined,
  fetchCounty = undefined,
  fetchCity = undefined,
  fetchZipcode = undefined,
}) => {
  const GeoPoints = OpenFruitModel(MODEL_NAMES.GeoPoints, {
    lat: NumberProperty({ required: true }),
    lon: NumberProperty({ required: true }),
  })

  const Continents = OpenFruitModel(MODEL_NAMES.Continents, {
    name: TextProperty({ required: true, maxLength: MAX_GEO_NAME }),
  })

  const Countries = OpenFruitModel(MODEL_NAMES.Countries, {
    name: TextProperty({ required: true, maxLength: MAX_GEO_NAME }),
    continent: ReferenceProperty(Continents, {
      fetcher: fetchContinent,
      required: true,
    }),
    abbreviation: TextProperty({ maxLength: 3 }),
    centerLatLon: ReferenceProperty(GeoPoints, { fetcher: fetchLatLon }),
  })

  const Regions = OpenFruitModel(MODEL_NAMES.Regions, {
    name: TextProperty({ required: true, maxLength: MAX_GEO_NAME }),
    country: ReferenceProperty(Countries, {
      fetcher: fetchCountry,
      required: true,
    }),
    centerLatLon: ReferenceProperty(GeoPoints, { fetcher: fetchLatLon }),
  })

  const States = OpenFruitModel(MODEL_NAMES.States, {
    name: TextProperty({ required: true, maxLength: MAX_GEO_NAME }),
    country: ReferenceProperty(Countries, {
      fetcher: fetchCountry,
      required: true,
    }),
    abbreviation: TextProperty({ maxLength: 3 }),
    centerLatLon: ReferenceProperty(GeoPoints, { fetcher: fetchLatLon }),
  })

  const Counties = OpenFruitModel(MODEL_NAMES.Counties, {
    name: TextProperty({ required: true, maxLength: MAX_GEO_NAME }),
    state: ReferenceProperty(States, { fetcher: fetchState, required: true }),
    centerLatLon: ReferenceProperty(GeoPoints, { fetcher: fetchLatLon }),
  })

  const Cities = OpenFruitModel(MODEL_NAMES.Cities, {
    name: TextProperty({ required: true, maxLength: MAX_GEO_NAME }),
    state: ReferenceProperty(States, { fetcher: fetchState, required: true }),
    county: ReferenceProperty(Counties, {
      fetcher: fetchCounty,
      required: false,
    }),
    centerLatLon: ReferenceProperty(GeoPoints, { fetcher: fetchLatLon }),
  })

  const Zipcodes = OpenFruitModel(MODEL_NAMES.Zipcodes, {
    name: TextProperty({ required: true, maxLength: MAX_GEO_NAME }),
    city: ReferenceProperty(Cities, { fetcher: fetchCity, required: false }),
    zipcode: IntegerProperty({ minValue: 1, maxValue: 99999 }),
    timezone: IntegerProperty({ required: false }),
    centerLatLon: ReferenceProperty(GeoPoints, { fetcher: fetchLatLon }),
  })

  const Locations = OpenFruitModel(MODEL_NAMES.Locations, {
    country: ReferenceProperty(Countries, {
      fetcher: fetchCountry,
      required: true,
    }),
    region: ReferenceProperty(Regions, {
      fetcher: fetchRegion,
      required: false,
    }),
    state: ReferenceProperty(States, { fetcher: fetchState, required: false }),
    county: ReferenceProperty(Counties, {
      fetcher: fetchCounty,
      required: false,
    }),
    city: ReferenceProperty(Cities, { fetcher: fetchCity, required: false }),
    zipcode: ReferenceProperty(Zipcodes, {
      fetcher: fetchZipcode,
      required: false,
    }),
    specificPointLatLon: ReferenceProperty(GeoPoints, {
      fetcher: fetchLatLon,
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
