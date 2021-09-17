const merge = require('lodash/merge')
const { textField } = require('functional-models')
const { MAX_NAME_LENGTH, MIN_NAME_LENGTH } = require('./constants')

const nameField = (config={}) => textField(merge(config, {
  minLength: MIN_NAME_LENGTH,
  maxLength: MAX_NAME_LENGTH,
}))

module.exports = {
  nameField,
}
