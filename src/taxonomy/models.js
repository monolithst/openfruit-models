const {
  field,
  textField,
  referenceField,
  validation,
} = require('functional-models')
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


const models = ({ createModel, genusFetcher=undefined, speciesFetcher=undefined, cultivarFetcher=undefined}={}) => {

  const genus = createModel('genus', {
    name: textField({ required: true}),
    latinName: latinNameField({ required: true })
  })

  const species = createModel('species', {
    name: textField({ required: true}),
    genus: referenceField({ fetcher: genusFetcher, required: true }),
    latinName: latinNameField({ required: true }),
    harvestMonthEarly: harvestMonthField(),
    harvestMonthEarlyModifier: harvestMonthModifierField(),
    harvestMonthLate: harvestMonthField(),
    harvestMonthLateModifier: harvestMonthModifierField(),
    fruitUse: fruitUseField(),
  })

  const cultivar = createModel('cultivar', {
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
