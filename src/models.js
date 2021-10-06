const merge = require('lodash/merge')
const {
  ConstantValueProperty,
  DateProperty,
} = require('functional-models')
const {
  LastModifiedDateProperty
} = require('functional-models-orm').properties

const models = ({ orm }) => {
  if (!orm) {
    throw new Error(`Must include an orm.`)
  }
  const Model = (modelType, keyToProperty, ...args) => {
    return orm.Model(
      modelType,
      merge(keyToProperty, {
        type: ConstantValueProperty(modelType),
        lastModified: LastModifiedDateProperty({ autoNow: true, required: true }),
        dateCreated: DateProperty({ autoNow: true, required: true }),
      }),
      ...args
    )
  }

  return {
    Model,
  }
}

module.exports = models
