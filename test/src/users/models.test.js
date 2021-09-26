const assert = require('chai').assert
const models = require('../../../src/users/models')
const { createModels } = require('../../commonTest')

describe('/src/users/models.js', () => {
  describe('#models()', () => {
    it('should create without exception if no configurations are passed', () => {
      assert.doesNotThrow(() => {
        const { OpenFruitModel } = createModels()
        models({ OpenFruitModel })
      })
    })
    describe('#UserApiKeys.create()', () => {
      it('should create without exception if no configurations are passed', () => {
        assert.doesNotThrow(() => {
          const { OpenFruitModel } = createModels()
          models({ OpenFruitModel }).UserApiKeys.create()
        })
      })
    })
    describe('#Users.create()', () => {
      it('should create without exception if no configurations are passed', () => {
        assert.doesNotThrow(() => {
          const { OpenFruitModel } = createModels()
          models({ OpenFruitModel }).Users.create()
        })
      })
      it('should return Users when instance.meta.getModel().getName() is called', () => {
        const { OpenFruitModel } = createModels()
        const instance = models({ OpenFruitModel }).Users.create()
        const actual = instance.meta.getModel().getName()
        const expected = 'Users'
        assert.deepEqual(actual, expected)
      })
    })
  })
})
