const {
  field,
  textField,
  referenceField,
  validation,
} = require('functional-models')
const { createStandardModel } = require('../commonModels')
const {
  chromosomeCountField,
  harvestMonthField,
  harvestMonthModifierField,
  fruitUseField,
  hexColorField,
  latinNameField,
} = require('./fields')
const {
  MAX_HISTORY,
  MAX_BRIEF_DESCRIPTION,
} = require('./constants')


const models = ({genusFetcher=undefined, speciesFetcher=undefined, cultivarFetcher=undefined}={}) => {

  const genus = createStandardModel('genus', {
    name: textField({ required: true}),
    latinName: latinNameField({ required: true })
  })

  const species = createStandardModel('species', {
    name: textField({ required: true}),
    genus: referenceField({ fetcher: genusFetcher, required: true }),
    latinName: latinNameField({ required: true }),
    harvestMonthEarly: harvestMonthField(),
    harvestMonthEarlyModifier: harvestMonthModifierField(),
    harvestMonthLate: harvestMonthField(),
    harvestMonthLateModifier: harvestMonthModifierField(),
    fruitUse: fruitUseField(),
  })

  const cultivar = createStandardModel('cultivar', {
    name: textField({ required: true}),
    genus: referenceField({ fetcher: genusFetcher, required: true }),
    species: referenceField({ fetcher: speciesFetcher, required: true }),
    harvestMonthEarly: harvestMonthField(),
    harvestMonthEarlyModifier: harvestMonthModifierField(),
    harvestMonthLate: harvestMonthField(),
    harvestMonthLateModifier: harvestMonthModifierField(),
    chromosomeCount: chromosomeCountField(),
    fruitUse: fruitUseField(),
    parentA: referenceField({ fetcher: cultivarFetcher, required: true }),
    parentB: referenceField({ fetcher: cultivarFetcher, required: true }),
    briefDescription: textField({ required: true, maxLength: MAX_BRIEF_DESCRIPTION}),
    history: textField({ required: true, maxLength: MAX_HISTORY}),
    colorPrimary: hexColorField({}),
    colorSecondary: hexColorField({}),
    colorTertiary: hexColorField({}),
  })

  return {
    genus,
    species,
    cultivar,
  }
}


module.exports = models
