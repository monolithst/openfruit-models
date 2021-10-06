const api = require('./api')
const geo = require('./geo')
const taxonomy = require('./taxonomy')
const metrics = require('./metrics')
const { getObjToArray } = require('./utils')

const MODEL_NAMES = getObjToArray([
  ...api.constants.MODEL_NAMES.toArray(),
  ...geo.constants.MODEL_NAMES.toArray(),
  ...taxonomy.constants.MODEL_NAMES.toArray(),
  ...metrics.constants.MODEL_NAMES.toArray(),
])

module.exports = {
  api,
  geo,
  taxonomy,
  metrics,
  models: require('./models'),
  MODEL_NAMES,
}
