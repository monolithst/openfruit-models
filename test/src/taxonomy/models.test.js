const assert = require('chai').assert
const sinon = require('sinon')
const models = require('../../../src/taxonomy/models')
const { createModels } = require('../../commonTest')

const LAST_MODIFIED = new Date().toISOString()
const LAST_UPDATED = new Date().toISOString()
const DATE_CREATED = new Date().toISOString()

const TEST_GENUS_1 = {
  id: 'genus-id',
  name: 'my-genus',
  latinName: 'genus-latin-name',
  lastModified: LAST_MODIFIED,
  dateCreated: DATE_CREATED,
}

const TEST_SPECIES_1 = {
  id: 'species-id',
  name: 'my-species',
  latinName: 'species-latin-name',
  lastModified: LAST_MODIFIED,
  dateCreated: DATE_CREATED,
}

const TEST_CULTIVAR_1 = {
  id: 'cultivar-id',
  name: 'my-cultivar',
  lastModified: LAST_MODIFIED,
  dateCreated: DATE_CREATED,
}

const TEST_CULTIVAR_2 = {
  id: 'cultivar-id-2',
  name: 'my-cultivar-2',
  lastModified: LAST_MODIFIED,
  dateCreated: DATE_CREATED,
  parentA: TEST_CULTIVAR_1,
  parentB: TEST_CULTIVAR_1,
}

describe('/src/taxonomy/models.js', () => {
  describe('#Genera.create()', () => {
    describe('#getType()', () => {
      it('should produce an object with a type of "Genera"', async () => {
        const { Model } = createModels()
        const taxModels = models({ Model })
        const actual = await taxModels.Genera.create(TEST_GENUS_1).getType()
        const expected = 'Genera'
        assert.equal(actual, expected)
      })
    })
    it('should produce an expected genus when toObj is called', async () => {
      const { Model } = createModels()
      const taxModels = models({ Model })
      const actual = await taxModels.Genera.create(
        TEST_GENUS_1
      ).functions.toObj()
      const expected = {
        id: 'genus-id',
        type: 'Genera',
        name: 'my-genus',
        lastModified: LAST_MODIFIED,
        dateCreated: DATE_CREATED,
        latinName: 'genus-latin-name',
      }
      assert.deepEqual(actual, expected)
    })
  })
  describe('#Species.create()', () => {
    describe('#getType()', () => {
      it('should produce an object with a type of "Species"', async () => {
        const { Model } = createModels()
        const taxModels = models({ Model })
        const genus = taxModels.Genera.create(TEST_GENUS_1)
        const species = taxModels.Species.create({ ...TEST_SPECIES_1, genus })
        const actual = await species.getType()
        const expected = 'Species'
        assert.equal(actual, expected)
      })
    })
    it('should produce an expected species when toObj is called', async () => {
      const { Model } = createModels()
      const taxModels = models({ Model })
      const genus = taxModels.Genera.create(TEST_GENUS_1)
      const species = taxModels.Species.create({ ...TEST_SPECIES_1, genus })
      const actual = await species.functions.toObj()
      const expected = {
        id: 'species-id',
        type: 'Species',
        name: 'my-species',
        genus: 'genus-id',
        lastModified: LAST_MODIFIED,
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
  describe('#Cultivars.create()', () => {
    describe('#getType()', () => {
      it('should produce an object with a type of "Cultivars"', async () => {
        const { Model } = createModels()
        const taxModels = models({ Model })
        const genus = taxModels.Genera.create(TEST_GENUS_1)
        const species = taxModels.Species.create({ ...TEST_SPECIES_1, genus })
        const cultivar = taxModels.Cultivars.create({
          ...TEST_CULTIVAR_1,
          species,
          genus,
        })
        const actual = await cultivar.getType()
        const expected = 'Cultivars'
        assert.equal(actual, expected)
      })
    })
    it('should produce an expected cultivar when toObj is called', async () => {
      const { Model } = createModels()
      const taxModels = models({ Model })
      const genus = taxModels.Genera.create(TEST_GENUS_1)
      const species = taxModels.Species.create({ ...TEST_SPECIES_1, genus })
      const cultivar = taxModels.Cultivars.create({
        ...TEST_CULTIVAR_1,
        species,
        genus,
      })
      const actual = await cultivar.functions.toObj()
      const expected = {
        id: 'cultivar-id',
        type: 'Cultivars',
        name: 'my-cultivar',
        species: 'species-id',
        genus: 'genus-id',
        lastModified: LAST_MODIFIED,
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
        const { Model } = createModels()
        const taxModels = models({ Model })
        const genus = taxModels.Genera.create(TEST_GENUS_1)
        const species = taxModels.Species.create({ ...TEST_SPECIES_1, genus })
        const cultivar = taxModels.Cultivars.create({
          ...TEST_CULTIVAR_1,
          species,
          genus,
        })
        const theGenus = await cultivar.getGenus()
        const actual = await theGenus.getName()
        const expected = 'my-genus'
        assert.deepEqual(actual, expected)
      })
    })
    describe('#getParentA()', () => {
      it('should call fetcher', async () => {
        const { Model } = createModels()
        const fetcher = sinon.stub().resolves(TEST_CULTIVAR_2)
        const taxModels = models({ Model, fetcher })
        const genus = taxModels.Genera.create(TEST_GENUS_1)
        const species = taxModels.Species.create({ ...TEST_SPECIES_1, genus })
        const cultivar = taxModels.Cultivars.create({
          ...TEST_CULTIVAR_2,
          species,
          genus,
        })
        await (await cultivar.getParentA()).functions.toObj()
        sinon.assert.calledOnce(fetcher)
      })
      it('should return model for parentB', async () => {
        const { Model } = createModels()
        const fetcher = sinon.stub().resolves(TEST_CULTIVAR_2)
        const taxModels = models({ Model, fetcher })
        const genus = taxModels.Genera.create(TEST_GENUS_1)
        const species = taxModels.Species.create({ ...TEST_SPECIES_1, genus })
        const cultivar = taxModels.Cultivars.create({
          ...TEST_CULTIVAR_2,
          species,
          genus,
        })
        const actual = await (await cultivar.getParentA()).functions.toObj()
        const expected = TEST_CULTIVAR_1.id
        assert.deepEqual(actual, expected)
      })
    })
    describe('#getParentB()', () => {
      it('should call fetcher', async () => {
        const { Model } = createModels()
        const fetcher = sinon.stub().resolves(TEST_CULTIVAR_2)
        const taxModels = models({ Model, fetcher })
        const genus = taxModels.Genera.create(TEST_GENUS_1)
        const species = taxModels.Species.create({ ...TEST_SPECIES_1, genus })
        const cultivar = taxModels.Cultivars.create({
          ...TEST_CULTIVAR_2,
          species,
          genus,
        })
        await (await cultivar.getParentB()).functions.toObj()
        sinon.assert.calledOnce(fetcher)
      })
      it('should return model for parentB', async () => {
        const { Model } = createModels()
        const fetcher = sinon.stub().resolves(TEST_CULTIVAR_2)
        const taxModels = models({ Model, fetcher })
        const genus = taxModels.Genera.create(TEST_GENUS_1)
        const species = taxModels.Species.create({ ...TEST_SPECIES_1, genus })
        const cultivar = taxModels.Cultivars.create({
          ...TEST_CULTIVAR_2,
          species,
          genus,
        })
        const actual = await (await cultivar.getParentB()).functions.toObj()
        const expected = TEST_CULTIVAR_1.id
        assert.deepEqual(actual, expected)
      })
    })
  })
})
