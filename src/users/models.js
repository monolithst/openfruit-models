const {
  textField,
  emailField,
} = require('functional-models')
const {
  createStandardModel
} = require('../commonModels')
const { nameField } = require('./fields')


const models = () => {
  const user = createStandardModel('user', {
    firstName: nameField({required: true}),
    lastName: nameField({required: true}),
    email: emailField({required: true}),
  })
  const userApiKey = createStandardModel('userApiKey', {
    apiKey: textField({ required: true})
  })
  return {
    user,
    userApiKey,
  }
}


module.exports = models
