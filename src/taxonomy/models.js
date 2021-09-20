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
  genusFetcher = undefined,
  speciesFetcher = undefined,
  cultivarFetcher = undefined,
}) => {
  const Genus = OpenFruitModel('genus', {
    name: TextProperty({ required: true }),
    latinName: LatinNameProperty({ required: true }),
  })

  const Species = OpenFruitModel('species', {
    name: TextProperty({ required: true }),
    genus: ReferenceProperty(Genus, { fetcher: genusFetcher, required: true }),
    latinName: LatinNameProperty({ required: true }),
    harvestMonthEarly: HarvestMonthProperty(),
    harvestMonthEarlyModifier: HarvestMonthModifierProperty(),
    harvestMonthLate: HarvestMonthProperty(),
    harvestMonthLateModifier: HarvestMonthModifierProperty(),
    fruitUse: FruitUseProperty(),
  })

  const Cultivar = OpenFruitModel('cultivar', {
    name: TextProperty({ required: true }),
    genus: ReferenceProperty(Genus, { fetcher: genusFetcher, required: true }),
    species: ReferenceProperty(Species, {
      fetcher: speciesFetcher,
      required: true,
    }),
    harvestMonthEarly: HarvestMonthProperty(),
    harvestMonthEarlyModifier: HarvestMonthModifierProperty(),
    harvestMonthLate: HarvestMonthProperty(),
    harvestMonthLateModifier: HarvestMonthModifierProperty(),
    chromosomeCount: ChromosomeCountProperty(),
    fruitUse: FruitUseProperty(),
    parentA: ReferenceProperty({ fetcher: cultivarFetcher, required: true }),
    parentB: ReferenceProperty({ fetcher: cultivarFetcher, required: true }),
    briefDescription: TextProperty({
      required: true,
      maxLength: MAX_BRIEF_DESCRIPTION,
    }),
    history: TextProperty({ required: true, maxLength: MAX_HISTORY }),
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
