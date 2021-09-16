const {
  smartObject,
  typed,
  named,
  property,
  lazyValue,
  lazyProperty2,
  uniqueId,
} = require('./common')


const userApiUsage = ({
  id,
  user,
  usageByYearAndMonth,
}) => {
  return smartObject([
    typed('userApiUsage'),
    uniqueId(id),
    property({user}),
    property({usageByYearAndMonth}),
  ])
}


module.exports = {
  userApiUsage,
}
