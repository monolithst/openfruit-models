const {
  smartObject,
  typed,
  named,
  property,
  lazyValue,
  lazyProperty2,
  uniqueId,
} = require('./common')



const latLon = ({lat, lon}) => {
  return smartObject([
    property({lat}),
    property({lon}),
    property('LatLon', lat && lon ? `${lat} ${lon}`: null)
  ])
}


const locationInfo = ({lat, lon, country, state=null, city=null, zipcode=null, county=null}) => {
  return {
    country,
    state,
    city,
    zipcode,
    county
  }
}


const location = ({id, name=null, lat, lon, locationInfo=null, geoLocator=null }) => {

  const lazyLocationInfo = lazyValue(() => {
    return locationInfo
      ? locationInfo
      : geoLocator
        ? geoLocator.getLocationInfo({lat, lon})
        : null
  })

  const internals = {
    ...uniqueId(id),
    ...typed('location'),
    ...named(name),
    ...latLon({lat, lon}),
    getState: lazyProperty2('State',  lazyLocationInfo, 'state'),
    getCountry: lazyProperty2('Country',  lazyLocationInfo, 'country'),
    getZipcode: lazyProperty2('Zipcode',  lazyLocationInfo, 'zipcode'),
    getCity: lazyProperty2('City',  lazyLocationInfo, 'city'),
    getCounty: lazyProperty2('county',  lazyLocationInfo, 'county'),
  }

  return smartObject(internals)
}


module.exports = {
  location,
  locationInfo,
  latLon,
}

