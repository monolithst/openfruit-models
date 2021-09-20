const merge = require('lodash/merge')
const {
  ConstantValueProperty,
  UniqueId,
  DateProperty,
} = require('functional-models')

const models = ({ orm }) => {
  const OpenFruitModel = (modelType, keyToProperty) => {
    return orm.Model(
      modelType,
      merge(keyToProperty, {
        type: ConstantValueProperty(modelType),
        id: UniqueId({ required: true }),
        lastModified: DateProperty({ autoNow: true, required: true }),
        lastUpdated: DateProperty({ autoNow: true, required: true }),
        dateCreated: DateProperty({ autoNow: true, required: true }),
      })
    )
  }

  return {
    OpenFruitModel,
  }
}

module.exports = models
