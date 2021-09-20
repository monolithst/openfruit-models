const {
  textField,
  emailField,
} = require('functional-models')
const { nameField } = require('./fields')


const models = ({createModel}) => {
  const user = createModel('user', {
    firstName: nameField({required: true}),
    lastName: nameField({required: true}),
    email: emailField({required: true}),
  })
  const userApiKey = createModel('userApiKey', {
    apiKey: textField({ required: true})
  })
  return {
    user,
    userApiKey,
  }
}


module.exports = models
