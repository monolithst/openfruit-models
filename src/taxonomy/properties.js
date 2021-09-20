const keys = require('lodash/keys')
const merge = require('lodash/merge')
const {
  TextProperty,
  IntegerProperty,
  ArrayProperty,
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

const ChromosomeCountProperty = (config = {}) =>
  IntegerProperty(
    merge(
      {
        defaultValue: 2,
        ...config,
      },
      {
        validators: [validation.choices(keys(CHROMOSOME_COUNT).map(parseInt))],
      }
    )
  )

const FruitUseProperty = (config = {}) =>
  ArrayProperty(
    merge(config, {
      validators: [
        validation.arrayType(validation.TYPE_PRIMATIVES.string),
        validation.choices(keys(FRUIT_USES)),
      ],
    })
  )

const HarvestMonthProperty = (config = {}) =>
  TextProperty(
    merge(config, {
      validators: [validation.choices(keys(RIPENING_MONTHS))],
    })
  )

const HarvestMonthModifierProperty = (config = {}) =>
  TextProperty(
    merge(config, {
      validators: [validation.choices(keys(RIPENING_MODIFIER))],
    })
  )

const HexColorProperty = (config = {}) =>
  TextProperty(
    merge(config, {
      minLength: HEX_TEXT_SIZE,
      maxLength: HEX_TEXT_SIZE,
      validators: [validation.meetsRegex(HEX_COLOR_REGEX)],
    })
  )

const LatinNameProperty = (config = {}) =>
  TextProperty(
    merge(config, {
      minLength: 3,
    })
  )

module.exports = {
  HexColorProperty,
  HarvestMonthModifierProperty,
  HarvestMonthProperty,
  FruitUseProperty,
  ChromosomeCountProperty,
  LatinNameProperty,
}
