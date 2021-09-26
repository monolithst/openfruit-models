const assert = require('chai').assert
const models = require('../../../src/geo/models')
const { createModels } = require('../../commonTest')

describe('/src/geo/models.js', () => {
  describe('#models()', () => {
    it('should create without exception if no configurations are passed', () => {
      assert.doesNotThrow(() => {
        const { OpenFruitModel } = createModels()
        models({ OpenFruitModel })
      })
    })
    describe('#Continents.create()', () => {
      it('should create without exception if no config is passed', () => {
        assert.doesNotThrow(() => {
          const { OpenFruitModel } = createModels()
          models({ OpenFruitModel }).Continents.create()
        })
      })
    })
    describe('#GeoPoints.create()', () => {
      it('should create without exception if no config is passed', () => {
        assert.doesNotThrow(() => {
          const { OpenFruitModel } = createModels()
          models({ OpenFruitModel }).GeoPoints.create()
        })
      })
    })
    describe('#Cities.create()', () => {
      it('should create without exception if no config is passed', () => {
        assert.doesNotThrow(() => {
          const { OpenFruitModel } = createModels()
          models({ OpenFruitModel }).Cities.create()
        })
      })
    })
    describe('#Countries.create()', () => {
      it('should create without exception if no config is passed', () => {
        assert.doesNotThrow(() => {
          const { OpenFruitModel } = createModels()
          models({ OpenFruitModel }).Countries.create()
        })
      })
    })
    describe('#Counties.create()', () => {
      it('should create without exception if no config is passed', () => {
        assert.doesNotThrow(() => {
          const { OpenFruitModel } = createModels()
          models({ OpenFruitModel }).Counties.create()
        })
      })
    })
    describe('#Locations.create()', () => {
      it('should create without exception if no config is passed', () => {
        assert.doesNotThrow(() => {
          const { OpenFruitModel } = createModels()
          models({ OpenFruitModel }).Locations.create()
        })
      })
    })
    describe('#States.create()', () => {
      it('should create without exception if no config is passed', () => {
        assert.doesNotThrow(() => {
          const { OpenFruitModel } = createModels()
          models({ OpenFruitModel }).States.create()
        })
      })
    })
    describe('#Regions.create()', () => {
      it('should create without exception if no config is passed', () => {
        assert.doesNotThrow(() => {
          const { OpenFruitModel } = createModels()
          models({ OpenFruitModel }).Regions.create()
        })
      })
    })
    describe('#Zipcodes.create()', () => {
      it('should create without exception if no config is passed', () => {
        assert.doesNotThrow(() => {
          const { OpenFruitModel } = createModels()
          models({ OpenFruitModel }).Zipcodes.create()
        })
      })
    })
  })
})
