const {
  TextProperty,
  EmailProperty,
  ReferenceProperty,
} = require('functional-models')
const { NameProperty } = require('./properties')

const models = ({ OpenFruitModel, userFetcher = undefined }) => {
  const Users = OpenFruitModel('Users', {
    firstName: NameProperty({ required: true }),
    lastName: NameProperty({ required: true }),
    email: EmailProperty({ required: true }),
  })
  const UserApiKeys = OpenFruitModel('UserApiKeys', {
    user: ReferenceProperty(Users, { fetcher: userFetcher, required: true }),
    apiKey: TextProperty({ required: true }),
  })
  return {
    Users,
    UserApiKeys,
  }
}

module.exports = models
