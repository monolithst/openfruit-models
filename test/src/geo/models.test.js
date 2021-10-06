const assert = require('chai').assert
const models = require('../../../src/geo/models')
const { createModels } = require('../../commonTest')

describe('/src/geo/models.js', () => {
  describe('#models()', () => {
    it('should create without exception if no configurations are passed', () => {
      assert.doesNotThrow(() => {
        const { Model } = createModels()
        models({ Model })
      })
    })
    describe('#Continents.create()', () => {
      it('should create without exception if no config is passed', () => {
        assert.doesNotThrow(() => {
          const { Model } = createModels()
          models({ Model }).Continents.create()
        })
      })
    })
    describe('#GeoPoints.create()', () => {
      it('should create without exception if no config is passed', () => {
        assert.doesNotThrow(() => {
          const { Model } = createModels()
          models({ Model }).GeoPoints.create()
        })
      })
    })
    describe('#Cities.create()', () => {
      it('should create without exception if no config is passed', () => {
        assert.doesNotThrow(() => {
          const { Model } = createModels()
          models({ Model }).Cities.create()
        })
      })
    })
    describe('#Countries.create()', () => {
      it('should create without exception if no config is passed', () => {
        assert.doesNotThrow(() => {
          const { Model } = createModels()
          models({ Model }).Countries.create()
        })
      })
    })
    describe('#Counties.create()', () => {
      it('should create without exception if no config is passed', () => {
        assert.doesNotThrow(() => {
          const { Model } = createModels()
          models({ Model }).Counties.create()
        })
      })
    })
    describe('#Locations.create()', () => {
      it('should create without exception if no config is passed', () => {
        assert.doesNotThrow(() => {
          const { Model } = createModels()
          models({ Model }).Locations.create()
        })
      })
    })
    describe('#States.create()', () => {
      it('should create without exception if no config is passed', () => {
        assert.doesNotThrow(() => {
          const { Model } = createModels()
          models({ Model }).States.create()
        })
      })
    })
    describe('#Regions.create()', () => {
      it('should create without exception if no config is passed', () => {
        assert.doesNotThrow(() => {
          const { Model } = createModels()
          models({ Model }).Regions.create()
        })
      })
    })
    describe('#Zipcodes.create()', () => {
      it('should create without exception if no config is passed', () => {
        assert.doesNotThrow(() => {
          const { Model } = createModels()
          models({ Model }).Zipcodes.create()
        })
      })
    })
  })
})
