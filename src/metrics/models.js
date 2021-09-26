const { ReferenceProperty, ObjectProperty } = require('functional-models')

const models = ({ OpenFruitModel, User, userFetcher = {} }) => {
  const UserApiUsage = OpenFruitModel({
    user: ReferenceProperty(User, { fetcher: userFetcher, required: true }),
    usageByYearAndMonth: ObjectProperty({
      required: true,
      isObject: true,
      defaultValue: {},
    }),
  })

  return {
    UserApiUsage,
  }
}

module.exports = models
