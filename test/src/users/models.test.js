const assert = require('chai').assert
const models = require('../../../src/users/models')
const { createModels } = require('../../commonTest')

describe('/src/users/models.js', () => {
  describe('#models()', () => {
    describe('#models()', () => {
      it('should create without exception if no configurations are passed', () => {
        assert.doesNotThrow(() => {
          const { OpenFruitModel } = createModels()
          models({ OpenFruitModel })
        })
      })
      describe('#UserApiKey.create()', () => {
        it('should create without exception if no configurations are passed', () => {
          assert.doesNotThrow(() => {
            const { OpenFruitModel } = createModels()
            models({ OpenFruitModel }).UserApiKey.create()
          })
        })
      })
      describe('#User.create()', () => {
        it('should create without exception if no configurations are passed', () => {
          assert.doesNotThrow(() => {
            const { OpenFruitModel } = createModels()
            models({ OpenFruitModel }).User.create()
          })
        })
        it('should return user when instance.meta.getModel().getName() is called', () => {
          const { OpenFruitModel } = createModels()
          const instance = models({ OpenFruitModel }).User.create()
          const actual = instance.meta.getModel().getName()
          const expected = 'user'
          assert.deepEqual(actual, expected)
        })
      })
    })
  })
})
