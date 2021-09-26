const assert = require('chai').assert
const models = require('../../../src/metrics/models')
const { createModels } = require('../../commonTest')
const userModels = require('../../../src/users/models')

describe('/src/metrics/models.js', () => {
  describe('#models()', () => {
    it('should create without exception if no configurations are passed', () => {
      assert.doesNotThrow(() => {
        const { OpenFruitModel } = createModels()
        const uModels = userModels({ OpenFruitModel })
        models({ OpenFruitModel, User: uModels.User })
      })
    })
    describe('#UserApiUsage.create()', () => {
      it('should create without exception if no config is passed', () => {
        assert.doesNotThrow(() => {
          const { OpenFruitModel } = createModels()
          const uModels = userModels({ OpenFruitModel })
          models({ OpenFruitModel, User: uModels.User }).UserApiUsage.create()
        })
      })
    })
  })
})
