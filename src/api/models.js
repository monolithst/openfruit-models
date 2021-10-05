const {
  TextProperty,
  ReferenceProperty,
} = require('functional-models')
const { MODEL_NAMES } = require('./constants')

const models = ({ OpenFruitModel, Users, fetcher = undefined }) => {

  const UserApiKeys = OpenFruitModel(MODEL_NAMES.UserApiKeys, {
    user: ReferenceProperty(Users, { fetcher, required: true }),
    apiKey: TextProperty({ required: true }),
  })
  return {
    UserApiKeys,
  }
}

module.exports = models
