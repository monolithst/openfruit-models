const { TextProperty, ReferenceProperty } = require('functional-models')
const { ormPropertyConfig } = require('functional-models-orm').properties
const { validation } = require('functional-models-orm')
const {
  ChromosomeCountProperty,
  HarvestMonthProperty,
  HarvestMonthModifierProperty,
  FruitUseProperty,
  HexColorProperty,
  LatinNameProperty,
} = require('./properties')

const {
  MAX_HISTORY,
  MAX_BRIEF_DESCRIPTION,
  MODEL_NAMES,
} = require('./constants')

const models = ({ Model, fetcher = undefined }) => {
  const Genera = Model(
    MODEL_NAMES.Genera,
    {
      name: TextProperty(ormPropertyConfig({ required: false, unique: 'name' })),
      latinName: LatinNameProperty(ormPropertyConfig({ required: true, unique: 'latinName' })),
    },
  )

  const Species = Model(
    MODEL_NAMES.Species,
    {
      name: TextProperty({ required: true }),
      genus: ReferenceProperty(Genera, { fetcher, required: true }),
      latinName: LatinNameProperty(ormPropertyConfig({ required: true, unique: 'latinName' })),
      harvestMonthEarly: HarvestMonthProperty(),
      harvestMonthEarlyModifier: HarvestMonthModifierProperty(),
      harvestMonthLate: HarvestMonthProperty(),
      harvestMonthLateModifier: HarvestMonthModifierProperty(),
      fruitUse: FruitUseProperty(),
    },
    {
      modelValidators: [
        validation.uniqueTogether(['genus', 'name']),
      ],
    }
  )

  // eslint-disable-next-line functional/no-let
  let Cultivars = null
  Cultivars = Model(
    MODEL_NAMES.Cultivars,
    {
      name: TextProperty({ required: true }),
      genus: ReferenceProperty(Genera, { fetcher, required: true }),
      species: ReferenceProperty(Species, {
        fetcher,
        required: true,
      }),
      harvestMonthEarly: HarvestMonthProperty(),
      harvestMonthEarlyModifier: HarvestMonthModifierProperty(),
      harvestMonthLate: HarvestMonthProperty(),
      harvestMonthLateModifier: HarvestMonthModifierProperty(),
      chromosomeCount: ChromosomeCountProperty(),
      fruitUse: FruitUseProperty(),
      parentA: ReferenceProperty(() => Cultivars, { fetcher }),
      parentB: ReferenceProperty(() => Cultivars, { fetcher }),
      briefDescription: TextProperty({
        maxLength: MAX_BRIEF_DESCRIPTION,
      }),
      history: TextProperty({ maxLength: MAX_HISTORY }),
      colorPrimary: HexColorProperty({}),
      colorSecondary: HexColorProperty({}),
      colorTertiary: HexColorProperty({}),
    },
    {
      modelValidators: [
        validation.uniqueTogether(['genus', 'species', 'name']),
      ],
    }
  )

  return {
    Genera,
    Species,
    Cultivars,
  }
}

module.exports = models
