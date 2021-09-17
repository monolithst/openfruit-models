const {
  numberField,
  textField,
  integerField,
  referenceField,
} = require('functional-models')
const { createStandardModel } = require('../commonModels')
const {
  MAX_GEO_NAME,
  MAX_STREET_ADDRESS,
} = require('./constants')

const models = ({
  fetchContinent=undefined,
  fetchLatLon=undefined,
  fetchCountry=undefined,
  fetchRegion=undefined,
  fetchState=undefined,
  fetchCounty=undefined,
  fetchCity=undefined,
  fetchZipcode=undefined,
}={}) => {

  const latLon = createStandardModel('latLon', {
    lat: numberField({required: true}),
    lon: numberField({required: true}),
  })

  const continent = createStandardModel('continent', {
    name: textField({required: true, maxLength: MAX_GEO_NAME})
  })

  const country = createStandardModel('country', {
    name: textField({required: true, maxLength: MAX_GEO_NAME}),
    continent: referenceField({fetcher: fetchContinent, required: true }),
    abbreviation: textField({ maxLength: 3 }),
    centerLatLon: referenceField({fetcher: fetchLatLon})
  })

  const region = createStandardModel('region', {
    name: textField({required: true, maxLength: MAX_GEO_NAME}),
    country: referenceField({fetcher: fetchCountry, required: true }),
    centerLatLon: referenceField({fetcher: fetchLatLon})
  })

  const state = createStandardModel('state', {
    name: textField({required: true, maxLength: MAX_GEO_NAME}),
    country: referenceField({fetcher: fetchCountry, required: true }),
    abbreviation: textField({ maxLength: 3 }),
    centerLatLon: referenceField({fetcher: fetchLatLon})
  })

  const county = createStandardModel('county', {
    name: textField({required: true, maxLength: MAX_GEO_NAME}),
    state: referenceField({fetcher: fetchState, required: true }),
    centerLatLon: referenceField({fetcher: fetchLatLon})
  })

  const city = createStandardModel('city', {
    name: textField({required: true, maxLength: MAX_GEO_NAME}),
    state: referenceField({fetcher: fetchState, required: true }),
    county: referenceField({fetcher: fetchCounty, required: false }),
    centerLatLon: referenceField({fetcher: fetchLatLon})
  })

  const zipcode = createStandardModel('zipcode', {
    name: textField({required: true, maxLength: MAX_GEO_NAME}),
    city: referenceField({fetcher: fetchCity, required: false }),
    zipcode: integerField({minValue: 1, maxValue: 99999}),
    timezone: integerField({required: false}),
    centerLatLon: referenceField({fetcher: fetchLatLon}),
  })

  const location = createStandardModel('location', {
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
