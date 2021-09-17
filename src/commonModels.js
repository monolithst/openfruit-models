const merge = require('lodash/merge')
const { constantValueField, uniqueId, dateField, createModel } = require('functional-models')

const createStandardModel = (type, keyToField) => {
  return createModel(merge(keyToField, {
    type: constantValueField(type),
    id: uniqueId({ required: true }),
    lastModified: dateField({autoNow: true, required: true}),
    lastUpdated: dateField({autoNow: true, required: true}),
    dateCreated: dateField({autoNow: true, required: true}),
  }))
}

module.exports = {
  createStandardModel
}
