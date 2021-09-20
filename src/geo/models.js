const {
  numberField,
  textField,
  integerField,
  referenceField,
} = require('functional-models')
const {
  MAX_GEO_NAME,
  MAX_STREET_ADDRESS,
} = require('./constants')

const models = ({
  createModel,
  fetchContinent=undefined,
  fetchLatLon=undefined,
  fetchCountry=undefined,
  fetchRegion=undefined,
  fetchState=undefined,
  fetchCounty=undefined,
  fetchCity=undefined,
  fetchZipcode=undefined,
}={}) => {

  const latLon = createModel('latLon', {
    lat: numberField({required: true}),
    lon: numberField({required: true}),
  })

  const continent = createModel('continent', {
    name: textField({required: true, maxLength: MAX_GEO_NAME})
  })

  const country = createModel('country', {
    name: textField({required: true, maxLength: MAX_GEO_NAME}),
    continent: referenceField({fetcher: fetchContinent, required: true }),
    abbreviation: textField({ maxLength: 3 }),
    centerLatLon: referenceField({fetcher: fetchLatLon})
  })

  const region = createModel('region', {
    name: textField({required: true, maxLength: MAX_GEO_NAME}),
    country: referenceField({fetcher: fetchCountry, required: true }),
    centerLatLon: referenceField({fetcher: fetchLatLon})
  })

  const state = createModel('state', {
    name: textField({required: true, maxLength: MAX_GEO_NAME}),
    country: referenceField({fetcher: fetchCountry, required: true }),
    abbreviation: textField({ maxLength: 3 }),
    centerLatLon: referenceField({fetcher: fetchLatLon})
  })

  const county = createModel('county', {
    name: textField({required: true, maxLength: MAX_GEO_NAME}),
    state: referenceField({fetcher: fetchState, required: true }),
    centerLatLon: referenceField({fetcher: fetchLatLon})
  })

  const city = createModel('city', {
    name: textField({required: true, maxLength: MAX_GEO_NAME}),
    state: referenceField({fetcher: fetchState, required: true }),
    county: referenceField({fetcher: fetchCounty, required: false }),
    centerLatLon: referenceField({fetcher: fetchLatLon})
  })

  const zipcode = createModel('zipcode', {
    name: textField({required: true, maxLength: MAX_GEO_NAME}),
    city: referenceField({fetcher: fetchCity, required: false }),
    zipcode: integerField({minValue: 1, maxValue: 99999}),
    timezone: integerField({required: false}),
    centerLatLon: referenceField({fetcher: fetchLatLon}),
  })

  const location = createModel('location', {
    country: referenceField({fetcher: fetchCountry, required: true }),
    region: referenceField({fetcher: fetchRegion, required: false }),
    state: referenceField({fetcher: fetchState, required: false }),
    county: referenceField({fetcher: fetchCounty, required: false }),
    city: referenceField({fetcher: fetchCity, required: false }),
    zipcode: referenceField({fetcher: fetchZipcode, required: false }),
    specificPointLatLon: referenceField({fetcher: fetchLatLon, required: false}),
    streetAddress: textField({maxLength: MAX_STREET_ADDRESS }),
    name: textField({maxLength: MAX_GEO_NAME}),
  })

  return {
    latLon,
    continent,
    country,
    region,
    state,
    county,
    zipcode,
    city,
    location
  }
}

module.exports = models
