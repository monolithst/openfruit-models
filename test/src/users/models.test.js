const assert = require('chai').assert
const models = require('../../../src/users/models')

describe('/src/users/models.js', () => {
  describe('#models()', () => {
    describe('#models()', () => {
      it('should create without exception if no configurations are passed', () => {
        assert.doesNotThrow(() => {
          models()
        })
      })
      describe('#userApiKey()', () => {
        it('should create without exception if no configurations are passed', () => {
          assert.doesNotThrow(() => {
            models().userApiKey()
          })
        })
      })
      describe('#user()', () => {
        it('should create without exception if no configurations are passed', () => {
          assert.doesNotThrow(() => {
            models().user()
          })
        })
        it('should return user when instance.meta.modelName is called', () => {
          const instance = models().user({})
          const actual = instance.meta.modelName
          const expected = 'user'
          assert.deepEqual(actual, expected)
        })
      })
    })
  })
})