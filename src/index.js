const users = require('./users')
const geo = require('./geo')
const taxonomy = require('./taxonomy')
const metrics = require('./metrics')

const createModelNamesList = () => {
  return [
    users.constants.MODEL_NAMES,
    geo.constants.MODEL_NAMES,
    taxonomy.constants.MODEL_NAMES,
    metrics.constants.MODEL_NAMES,
  ].sort((x,y)=>x.localeCompare(y))
}


module.exports = {
  users,
  geo,
  taxonomy,
  metrics,
  MODEL_NAMES: createModelNamesList(),
}
