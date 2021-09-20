const {
  referenceField,
  objectField,
} = require('functional-models')

const models = ({createModel, userFetcher={}}={}) => {
  const userApiUsage = createModel({
    user: referenceField({ fetcher: userFetcher, required: true}),
    usageByYearAndMonth: objectField({ required: true, isObject: true, defaultValue: {} })
  })

  return {
    userApiUsage,
  }
}

module.exports = models
