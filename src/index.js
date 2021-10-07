const api = require('./api')
const auth = require('./auth')
const geo = require('./geo')
const taxonomy = require('./taxonomy')
const metrics = require('./metrics')
const { getObjToArray } = require('./utils')

const MODEL_NAMES = getObjToArray([
  ...auth.constants.MODEL_NAMES.toArray(),
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
  auth,
  models: require('./models'),
  MODEL_NAMES,
}
