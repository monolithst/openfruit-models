const {
  referenceField,
  objectField,
} = require('functional-models')
const { createStandardModel } = require('../commonModels')

const models = ({userFetcher={}}={}) => {
  const userApiUsage = createStandardModel({
    user: referenceField({ fetcher: userFetcher, required: true}),
    usageByYearAndMonth: objectField({ required: true, isObject: true, defaultValue: {} })
  })

  return {
    userApiUsage,
  }
}

module.exports = models
