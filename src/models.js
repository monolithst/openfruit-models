const merge = require('lodash/merge')
const {
  ConstantValueProperty,
  DateProperty,
} = require('functional-models')

const models = ({ orm }) => {
  if (!orm) {
    throw new Error(`Must include an orm.`)
  }
  const OpenFruitModel = (modelType, keyToProperty, ...args) => {
    return orm.Model(
      modelType,
      merge(keyToProperty, {
        type: ConstantValueProperty(modelType),
        lastModified: DateProperty({ autoNow: true, required: true }),
        lastUpdated: DateProperty({ autoNow: true, required: true }),
        dateCreated: DateProperty({ autoNow: true, required: true }),
      }),
      ...args
    )
  }

  return {
    OpenFruitModel,
  }
}

module.exports = models
