const models = require('../src/models')
const { orm, datastore } = require('functional-models-orm')

const createModels = () => {
  const datastoreProvider = datastore.memory()
  const myOrm = orm({ datastoreProvider })
  const ofModels = models({ orm: myOrm })
  return {
    ...ofModels,
  }
}

module.exports = {
  createModels,
}
