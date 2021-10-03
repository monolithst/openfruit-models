const {
  TextProperty,
  EmailProperty,
  ReferenceProperty,
} = require('functional-models')
const { NameProperty } = require('./properties')
const { MODEL_NAMES } = require('./constants')

const models = ({ OpenFruitModel, fetcher = undefined }) => {
  const Users = OpenFruitModel(MODEL_NAMES.Users, {
    firstName: NameProperty({ required: true }),
    lastName: NameProperty({ required: true }),
    email: EmailProperty({ required: true }),
  })
  const UserApiKeys = OpenFruitModel(MODEL_NAMES.UserApiKeys, {
    user: ReferenceProperty(Users, { fetcher, required: true }),
    apiKey: TextProperty({ required: true }),
  })
  return {
    Users,
    UserApiKeys,
  }
}

module.exports = models
