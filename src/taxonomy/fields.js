const keys = require('lodash/keys')
const merge = require('lodash/merge')
const {
  textField,
  integerField,
  arrayField,
  validation,
} = require('functional-models')
const {
  FRUIT_USES,
  CHROMOSOME_COUNT,
  RIPENING_MODIFIER,
  RIPENING_MONTHS,
} = require('./constants')

const HEX_COLOR_REGEX = /^[a-fA-F0-9]{6}$/u
const HEX_TEXT_SIZE = 6

const chromosomeCountField = (config={}) => integerField(merge({
  defaultValue: 2,
  ...config
}, {
  validators: [
    validation.choices(keys(CHROMOSOME_COUNT).map(parseInt)),
  ]
}))

const fruitUseField = (config={}) => arrayField(merge(config, {
  validators: [
    validation.arrayType(validation.TYPE_PRIMATIVES.string),
    validation.choices(keys(FRUIT_USES)),
  ]
}))

const harvestMonthField = (config={}) => textField(merge(config, {
  validators: [
    validation.choices(keys(RIPENING_MONTHS)),
  ]
}))

const harvestMonthModifierField = (config={}) => textField(merge(config, {
  validators: [
    validation.choices(keys(RIPENING_MODIFIER)),
  ]
}))

const hexColorField = (config={}) => textField(merge(config, {
  minLength: HEX_TEXT_SIZE,
  maxLength: HEX_TEXT_SIZE,
  validators: [
    validation.meetsRegex(HEX_COLOR_REGEX)
  ]
}))

const latinNameField = (config={}) => textField(merge(config, {
  minLength: 3
}))

module.exports = {
  hexColorField,
  harvestMonthModifierField,
  harvestMonthField,
  fruitUseField,
  chromosomeCountField,
  latinNameField,
}
