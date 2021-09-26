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
    describe('#Continent.create()', () => {
      it('should create without exception if no config is passed', () => {
        assert.doesNotThrow(() => {
          const { OpenFruitModel } = createModels()
          models({ OpenFruitModel }).Continent.create()
        })
      })
    })
    describe('#LatLon.create()', () => {
      it('should create without exception if no config is passed', () => {
        assert.doesNotThrow(() => {
          const { OpenFruitModel } = createModels()
          models({ OpenFruitModel }).LatLon.create()
        })
      })
    })
    describe('#City.create()', () => {
      it('should create without exception if no config is passed', () => {
        assert.doesNotThrow(() => {
          const { OpenFruitModel } = createModels()
          models({ OpenFruitModel }).City.create()
        })
      })
    })
    describe('#Country.create()', () => {
      it('should create without exception if no config is passed', () => {
        assert.doesNotThrow(() => {
          const { OpenFruitModel } = createModels()
          models({ OpenFruitModel }).Country.create()
        })
      })
    })
    describe('#County.create()', () => {
      it('should create without exception if no config is passed', () => {
        assert.doesNotThrow(() => {
          const { OpenFruitModel } = createModels()
          models({ OpenFruitModel }).County.create()
        })
      })
    })
    describe('#Location.create()', () => {
      it('should create without exception if no config is passed', () => {
        assert.doesNotThrow(() => {
          const { OpenFruitModel } = createModels()
          models({ OpenFruitModel }).Location.create()
        })
      })
    })
    describe('#State.create()', () => {
      it('should create without exception if no config is passed', () => {
        assert.doesNotThrow(() => {
          const { OpenFruitModel } = createModels()
          models({ OpenFruitModel }).State.create()
        })
      })
    })
    describe('#Region.create()', () => {
      it('should create without exception if no config is passed', () => {
        assert.doesNotThrow(() => {
          const { OpenFruitModel } = createModels()
          models({ OpenFruitModel }).Region.create()
        })
      })
    })
    describe('#Zipcode.create()', () => {
      it('should create without exception if no config is passed', () => {
        assert.doesNotThrow(() => {
          const { OpenFruitModel } = createModels()
          models({ OpenFruitModel }).Zipcode.create()
        })
      })
    })
  })
})
