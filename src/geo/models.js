const {
  NumberProperty,
  TextProperty,
  IntegerProperty,
  ReferenceProperty,
} = require('functional-models')
const { MAX_GEO_NAME, MAX_STREET_ADDRESS } = require('./constants')

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
  const LatLon = OpenFruitModel('latLon', {
    lat: NumberProperty({ required: true }),
    lon: NumberProperty({ required: true }),
  })

  const Continent = OpenFruitModel('continent', {
    name: TextProperty({ required: true, maxLength: MAX_GEO_NAME }),
  })

  const Country = OpenFruitModel('country', {
    name: TextProperty({ required: true, maxLength: MAX_GEO_NAME }),
    continent: ReferenceProperty(Continent, {
      fetcher: fetchContinent,
      required: true,
    }),
    abbreviation: TextProperty({ maxLength: 3 }),
    centerLatLon: ReferenceProperty(LatLon, { fetcher: fetchLatLon }),
  })

  const Region = OpenFruitModel('region', {
    name: TextProperty({ required: true, maxLength: MAX_GEO_NAME }),
    country: ReferenceProperty(Country, {
      fetcher: fetchCountry,
      required: true,
    }),
    centerLatLon: ReferenceProperty(LatLon, { fetcher: fetchLatLon }),
  })

  const State = OpenFruitModel('state', {
    name: TextProperty({ required: true, maxLength: MAX_GEO_NAME }),
    country: ReferenceProperty(Country, {
      fetcher: fetchCountry,
      required: true,
    }),
    abbreviation: TextProperty({ maxLength: 3 }),
    centerLatLon: ReferenceProperty(LatLon, { fetcher: fetchLatLon }),
  })

  const County = OpenFruitModel('county', {
    name: TextProperty({ required: true, maxLength: MAX_GEO_NAME }),
    state: ReferenceProperty(State, { fetcher: fetchState, required: true }),
    centerLatLon: ReferenceProperty(LatLon, { fetcher: fetchLatLon }),
  })

  const City = OpenFruitModel('city', {
    name: TextProperty({ required: true, maxLength: MAX_GEO_NAME }),
    state: ReferenceProperty(State, { fetcher: fetchState, required: true }),
    county: ReferenceProperty(County, {
      fetcher: fetchCounty,
      required: false,
    }),
    centerLatLon: ReferenceProperty(LatLon, { fetcher: fetchLatLon }),
  })

  const Zipcode = OpenFruitModel('zipcode', {
    name: TextProperty({ required: true, maxLength: MAX_GEO_NAME }),
    city: ReferenceProperty(City, { fetcher: fetchCity, required: false }),
    zipcode: IntegerProperty({ minValue: 1, maxValue: 99999 }),
    timezone: IntegerProperty({ required: false }),
    centerLatLon: ReferenceProperty(LatLon, { fetcher: fetchLatLon }),
  })

  const Location = OpenFruitModel('location', {
    country: ReferenceProperty(Country, {
      fetcher: fetchCountry,
      required: true,
    }),
    region: ReferenceProperty(Region, {
      fetcher: fetchRegion,
      required: false,
    }),
    state: ReferenceProperty(State, { fetcher: fetchState, required: false }),
    county: ReferenceProperty(County, {
      fetcher: fetchCounty,
      required: false,
    }),
    city: ReferenceProperty(City, { fetcher: fetchCity, required: false }),
    zipcode: ReferenceProperty(Zipcode, {
      fetcher: fetchZipcode,
      required: false,
    }),
    specificPointLatLon: ReferenceProperty(LatLon, {
      fetcher: fetchLatLon,
      required: false,
    }),
    streetAddress: TextProperty({ maxLength: MAX_STREET_ADDRESS }),
    name: TextProperty({ maxLength: MAX_GEO_NAME }),
  })

  return {
    LatLon,
    Continent,
    Country,
    Region,
    State,
    County,
    Zipcode,
    City,
    Location,
  }
}

module.exports = models
