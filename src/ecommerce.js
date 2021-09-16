const {
  smartObject,
  typed,
  named,
  property,
  lazyValue,
  lazyProperty2,
  uniqueId,
  dateProperty,
} = require('./common')


const DEFAULT_PRODUCT_STATES = {
  available: 'available',
  backorder: 'backorder',
  preorder: 'preorder',
}


const userApiPayment = ({
  id,
  date,
  amount,
}) => {
  return smartObject([
    uniqueId(id),
    dateProperty(date),
    property({amount}),
  ])
}


const product = ({
  id,
  user,
  inventoryItem,
  pricings,
  shippingStructure,
  productState,
}) => {
  return smartObject([
    uniqueId(id),
    property({user}),
    property({inventoryItem}),
    property({pricings}),
    property({shippingStructure}),
    property({productState}),
  ])
}


module.exports = {
  userApiPayment,
  product,
  DEFAULT_PRODUCT_STATES,
}
