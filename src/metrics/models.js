const { ReferenceProperty, ObjectProperty } = require('functional-models')

const models = ({ OpenFruitModel, Users, userFetcher = {} }) => {
  const UserApiUsages = OpenFruitModel('UserApiUsages', {
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
