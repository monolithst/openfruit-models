const users = require('./users')
const geo = require('./geo')
const taxonomy = require('./taxonomy')
const metrics = require('./metrics')

const createModelNamesList = () => {
  return [
    ...users.constants.MODEL_NAMES.toArray(),
    ...geo.constants.MODEL_NAMES.toArray(),
    ...taxonomy.constants.MODEL_NAMES.toArray(),
    ...metrics.constants.MODEL_NAMES.toArray(),
  ].sort((x,y)=>x.localeCompare(y))
}


module.exports = {
  users,
  geo,
  taxonomy,
  metrics,
  models: require('./models'),
  MODEL_NAMES: createModelNamesList(),
}
