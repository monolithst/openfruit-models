const assert = require('chai').assert
const models = require('../../../src/taxonomy/models')

const LAST_MODIFIED = new Date().toISOString()
const LAST_UPDATED = new Date().toISOString()
const DATE_CREATED = new Date().toISOString()

const TEST_GENUS_1 = {
  id: 'genus-id',
  name: 'my-genus',
  latinName: 'genus-latin-name',
  lastModified: LAST_MODIFIED,
  lastUpdated: LAST_UPDATED,
  dateCreated: DATE_CREATED,
}

const TEST_SPECIES_1 = {
  id: 'species-id',
  name: 'my-species',
  latinName: 'species-latin-name',
  lastModified: LAST_MODIFIED,
  lastUpdated: LAST_UPDATED,
  dateCreated: DATE_CREATED,
}

const TEST_CULTIVAR_1 = {
  id: 'cultivar-id',
  name: 'my-cultivar',
  lastModified: LAST_MODIFIED,
  lastUpdated: LAST_UPDATED,
  dateCreated: DATE_CREATED,
}

describe('/src/taxonomy/models.js', () => {
  describe('#genus()', () => {
    describe('#getType()', () => {
      it('should produce an object with a type of "genus"', async () => {
        const actual = await models().genus(TEST_GENUS_1).getType()
        const expected = 'genus'
        assert.equal(actual, expected)
      })
    })
    it('should produce an expected genus when toJson is called', async () => {
      const actual = await models().genus(TEST_GENUS_1).functions.toJson()
      const expected = {
        id: 'genus-id',
        type: 'genus',
        name: 'my-genus',
        lastModified: LAST_MODIFIED,
        lastUpdated: LAST_UPDATED,
        dateCreated: DATE_CREATED,
        latinName: 'genus-latin-name'
      }
      assert.deepEqual(actual, expected)
    })
  })
  describe('#species()', () => {
    describe('#getType()', () => {
      it('should produce an object with a type of "species"', async () => {
        const genus = models().genus(TEST_GENUS_1)
        const species = models().species({...TEST_SPECIES_1, genus })
        const actual = await species.getType()
        const expected = 'species'
        assert.equal(actual, expected)
      })
    })
    it('should produce an expected species when toJson is called', async () => {
      const genus = models().genus(TEST_GENUS_1)
      const species = models().species({...TEST_SPECIES_1, genus })
      const actual = await species.functions.toJson()
      const expected = {
        id: 'species-id',
        type: 'species',
        name: 'my-species',
        genus: 'genus-id',
        lastModified: LAST_MODIFIED,
        lastUpdated: LAST_UPDATED,
        dateCreated: DATE_CREATED,
        latinName: 'species-latin-name',
        fruitUse: [],
        harvestMonthEarly: null,
        harvestMonthEarlyModifier: null,
        harvestMonthLate: null,
        harvestMonthLateModifier: null,
      }
      assert.deepEqual(actual, expected)
    })
  })
  describe('#cultivar()', () => {
    describe('#getType()', () => {
      it('should produce an object with a type of "cultivar"', async () => {
        const genus = models().genus(TEST_GENUS_1)
        const species = models().species({...TEST_SPECIES_1, genus })
        const cultivar = models().cultivar({...TEST_CULTIVAR_1, species, genus })
        const actual = await cultivar.getType()
        const expected = 'cultivar'
        assert.equal(actual, expected)
      })
    })
    it('should produce an expected cultivar when toJson is called', async () => {
      const genus = models().genus(TEST_GENUS_1)
      const species = models().species({...TEST_SPECIES_1, genus })
      const cultivar = models().cultivar({...TEST_CULTIVAR_1, species, genus })
      const actual = await cultivar.functions.toJson()
      const expected = {
        id: 'cultivar-id',
        type: 'cultivar',
        name: 'my-cultivar',
        species: 'species-id',
        genus: 'genus-id',
        lastModified: LAST_MODIFIED,
        lastUpdated: LAST_UPDATED,
        dateCreated: DATE_CREATED,
        chromosomeCount: 2,
        fruitUse: [],
        harvestMonthEarly: null,
        harvestMonthEarlyModifier: null,
        harvestMonthLate: null,
        harvestMonthLateModifier: null,
        briefDescription: null,
        history: null,
        parentA: null,
        parentB: null,
        colorPrimary: null,
        colorSecondary: null,
        colorTertiary: null,
      }
      assert.deepEqual(actual, expected)
    })
    describe('#getGenus()', () => {
      it('should return "my-genus" for the name of the genus', async () => {
        const genus = models().genus(TEST_GENUS_1)
        const species = models().species({...TEST_SPECIES_1, genus })
        const cultivar = models().cultivar({...TEST_CULTIVAR_1, species, genus })
        const actual = await (await cultivar.getGenus()).getName()
        const expected = 'my-genus'
        assert.deepEqual(actual, expected)
      })
    })
  })
})
