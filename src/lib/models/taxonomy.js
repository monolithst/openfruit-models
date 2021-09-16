const {
  smartObject,
  typed,
  named,
  property,
  uniqueId,
} = require('./common')

const {
  location,
} = require('./geo')


const genus = ({ id, name }) => {
  return smartObject([
    typed('genus'),
    uniqueId(id),
    named(name),
  ])
}



const species = ({ id, name, genus, location }) => {
  return smartObject([
    typed('species'),
    uniqueId(id),
    named(name),
    property({genus}),
    property({origin: location}),
  ])
}


const cultivar = ({ id, name, species, genus, location=null }) => {
  return smartObject([
    typed('cultivar'),
    uniqueId(id),
    named(name),
    property({genus}),
    property({species}),
    property({origin: location}),
  ])
}



module.exports = {
  genus,
  species,
  cultivar,
}
