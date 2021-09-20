const {
  TextProperty,
  EmailProperty,
  ReferenceProperty,
} = require('functional-models')
const { NameProperty } = require('./properties')

const models = ({ OpenFruitModel, userFetcher = undefined }) => {
  const User = OpenFruitModel('user', {
    firstName: NameProperty({ required: true }),
    lastName: NameProperty({ required: true }),
    email: EmailProperty({ required: true }),
  })
  const UserApiKey = OpenFruitModel('userApiKey', {
    user: ReferenceProperty(User, { fetcher: userFetcher, required: true }),
    apiKey: TextProperty({ required: true }),
  })
  return {
    User,
    UserApiKey,
  }
}

module.exports = models
