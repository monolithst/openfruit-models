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


const inventoryItem = ({
  id,
  inventoryState,
  owner,
  count,
  inventoryDetails={},
}) => {
  return smartObject([
    typed('inventoryItem'),
    uniqueId(id),
    property({owner}),
    property({inventoryState}),
    property({count}),
    property({inventoryDetails}),
  ])
}



module.exports = {
  inventoryItem,
}
