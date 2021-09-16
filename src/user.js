const {
  smartObject,
  typed,
  named,
  property,
  uniqueId,
  dateProperty,
} = require('./common')
const {
  location,
} = require('./geo')


const user = ({
  id,
  firstName,
  lastName,
  email,
  dateCreated=null,
}) => {
  return smartObject([
    typed('user'),
    uniqueId(id),
    property({firstName}),
    property({lastName}),
    property({email}),
    dateProperty(dateCreated || new Date(), 'dateCreated'),
  ])
}


const userAddress = ({
  id,
  user,
  addressLine1,
  addressLine2,
  city,
  state,
  zipcode,
}) => {
  return smartObject([
    typed('userAddress'),
    uniqueId(id),
    property({user}),
    property({addressLine1}),
    property({addressLine2}),
    property({city}),
    property({state}),
    property({zipcode}),
  ])
}


const userApiKey = ({id, apiKey}) => {
  return smartObject([
    uniqueId(id),
    typed('userApiKey'),
    property({apiKey})
  ])
}


module.exports = {
  user,
  userAddress,
  userApiKey,
}


