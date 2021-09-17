const assert = require('chai').assert
const models = require('../../../src/geo/models')

describe('/src/geo/models.js', () => {
  describe('#models()', () => {
    describe('#models()', () => {
      it('should create without exception if no configurations are passed', () => {
        assert.doesNotThrow(() => {
          models()
        })
      })
      describe('#continent()', () => {
        it('should create without exception if no config is passed', () => {
          assert.doesNotThrow(() => {
            models().continent()
          })
        })
      })
      describe('#latLon()', () => {
        it('should create without exception if no config is passed', () => {
          assert.doesNotThrow(() => {
            models().latLon()
          })
        })
      })
      describe('#city()', () => {
        it('should create without exception if no config is passed', () => {
          assert.doesNotThrow(() => {
            models().city()
          })
        })
      })
      describe('#country()', () => {
        it('should create without exception if no config is passed', () => {
          assert.doesNotThrow(() => {
            models().country()
          })
        })
      })
      describe('#county()', () => {
        it('should create without exception if no config is passed', () => {
          assert.doesNotThrow(() => {
            models().county()
          })
        })
      })
      describe('#location()', () => {
        it('should create without exception if no config is passed', () => {
          assert.doesNotThrow(() => {
            models().location()
          })
        })
      })
      describe('#state()', () => {
        it('should create without exception if no config is passed', () => {
          assert.doesNotThrow(() => {
            models().state()
          })
        })
      })
      describe('#region()', () => {
        it('should create without exception if no config is passed', () => {
          assert.doesNotThrow(() => {
            models().region()
          })
        })
      })
      describe('#zipcode()', () => {
        it('should create without exception if no config is passed', () => {
          assert.doesNotThrow(() => {
            models().zipcode()
          })
        })
      })


    })
  })
})