const { TextProperty, ReferenceProperty } = require('functional-models')
const {
  ChromosomeCountProperty,
  HarvestMonthProperty,
  HarvestMonthModifierProperty,
  FruitUseProperty,
  HexColorProperty,
  LatinNameProperty,
} = require('./properties')
const { MAX_HISTORY, MAX_BRIEF_DESCRIPTION } = require('./constants')

const models = ({
  OpenFruitModel,
  fetcher = undefined,
}) => {
  const Genera = OpenFruitModel('Genera', {
    name: TextProperty({ required: true }),
    latinName: LatinNameProperty({ required: true }),
  })

  const Species = OpenFruitModel('Species', {
    name: TextProperty({ required: true }),
    genus: ReferenceProperty(Genera, { fetcher, required: true }),
    latinName: LatinNameProperty({ required: true }),
    harvestMonthEarly: HarvestMonthProperty(),
    harvestMonthEarlyModifier: HarvestMonthModifierProperty(),
    harvestMonthLate: HarvestMonthProperty(),
    harvestMonthLateModifier: HarvestMonthModifierProperty(),
    fruitUse: FruitUseProperty(),
  })

  let Cultivars = null
  Cultivars = OpenFruitModel('Cultivars', {
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
    parentA: ReferenceProperty(()=>Cultivars, { fetcher }),
    parentB: ReferenceProperty(()=>Cultivars, { fetcher }),
    briefDescription: TextProperty({
      maxLength: MAX_BRIEF_DESCRIPTION,
    }),
    history: TextProperty({ maxLength: MAX_HISTORY }),
    colorPrimary: HexColorProperty({}),
    colorSecondary: HexColorProperty({}),
    colorTertiary: HexColorProperty({}),
  })

  return {
    Genera,
    Species,
    Cultivars,
  }
}

module.exports = models
