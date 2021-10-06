const { ReferenceProperty, ObjectProperty } = require('functional-models')
const { MODEL_NAMES } = require('./constants')

const models = ({ Model, Users, fetcher = {} }) => {
  const UserApiUsages = Model(MODEL_NAMES.UserApiUsages, {
    user: ReferenceProperty(Users, { fetcher, required: true }),
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
