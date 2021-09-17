const assert = require('chai').assert
const models = require('../../../src/metrics/models')

describe('/src/metrics/models.js', () => {
  describe('#models()', () => {
    describe('#models()', () => {
      it('should create without exception if no configurations are passed', () => {
        assert.doesNotThrow(() => {
          models()
        })
      })
      describe('#userApiUsage()', () => {
        it('should create without exception if no config is passed', () => {
          assert.doesNotThrow(() => {
            models().userApiUsage({})
          })
        })
      })
    })
  })
})