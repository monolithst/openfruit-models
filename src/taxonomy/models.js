const { TextProperty, ReferenceProperty } = require('functional-models')
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

const models = ({ OpenFruitModel, fetcher = undefined }) => {
  const Genera = OpenFruitModel(
    MODEL_NAMES.Genera,
    {
      name: TextProperty({ required: true }),
      latinName: LatinNameProperty({ required: true }),
    },
    {
      modelValidators: [
        validation.unique('latinName'),
        validation.unique('name'),
      ],
    }
  )

  const Species = OpenFruitModel(
    MODEL_NAMES.Species,
    {
      name: TextProperty({ required: true }),
      genus: ReferenceProperty(Genera, { fetcher, required: true }),
      latinName: LatinNameProperty({ required: true }),
      harvestMonthEarly: HarvestMonthProperty(),
      harvestMonthEarlyModifier: HarvestMonthModifierProperty(),
      harvestMonthLate: HarvestMonthProperty(),
      harvestMonthLateModifier: HarvestMonthModifierProperty(),
      fruitUse: FruitUseProperty(),
    },
    {
      modelValidators: [
        validation.unique('latinName'),
        validation.uniqueTogether(['genus', 'name']),
      ],
    }
  )

  // eslint-disable-next-line functional/no-let
  let Cultivars = null
  Cultivars = OpenFruitModel(
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
