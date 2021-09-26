const merge = require('lodash/merge')
const { TextProperty } = require('functional-models')
const { MAX_NAME_LENGTH, MIN_NAME_LENGTH } = require('./constants')

const NameProperty = (config = {}) =>
  TextProperty(
    merge(config, {
      minLength: MIN_NAME_LENGTH,
      maxLength: MAX_NAME_LENGTH,
    })
  )

module.exports = {
  NameProperty,
}
