const { ReferenceProperty, ObjectProperty } = require('functional-models')
const { MODEL_NAMES } = require('./constants')

const models = ({ OpenFruitModel, Users, userFetcher = {} }) => {
  const UserApiUsages = OpenFruitModel(MODEL_NAMES.UserApiUsages, {
    user: ReferenceProperty(Users, { fetcher: userFetcher, required: true }),
    usageByYearAndMonth: ObjectProperty({
      required: true,
      isObject: true,
      defaultValue: {},
    }),
  })

  return {
    UserApiUsages,
  }
}

module.exports = models
