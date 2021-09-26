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
  const Genus = OpenFruitModel('genus', {
    name: TextProperty({ required: true }),
    latinName: LatinNameProperty({ required: true }),
  })

  const Species = OpenFruitModel('species', {
    name: TextProperty({ required: true }),
    genus: ReferenceProperty(Genus, { fetcher, required: true }),
    latinName: LatinNameProperty({ required: true }),
    harvestMonthEarly: HarvestMonthProperty(),
    harvestMonthEarlyModifier: HarvestMonthModifierProperty(),
    harvestMonthLate: HarvestMonthProperty(),
    harvestMonthLateModifier: HarvestMonthModifierProperty(),
    fruitUse: FruitUseProperty(),
  })

  let Cultivar = null
  Cultivar = OpenFruitModel('cultivar', {
    name: TextProperty({ required: true }),
    genus: ReferenceProperty(Genus, { fetcher, required: true }),
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
    parentA: ReferenceProperty(()=>Cultivar, { fetcher }),
    parentB: ReferenceProperty(()=>Cultivar, { fetcher }),
    briefDescription: TextProperty({
      maxLength: MAX_BRIEF_DESCRIPTION,
    }),
    history: TextProperty({ maxLength: MAX_HISTORY }),
    colorPrimary: HexColorProperty({}),
    colorSecondary: HexColorProperty({}),
    colorTertiary: HexColorProperty({}),
  })

  return {
    Genus,
    Species,
    Cultivar,
  }
}

module.exports = models
