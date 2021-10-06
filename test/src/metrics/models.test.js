const assert = require('chai').assert
const { models: authModels } = require('functional-models-auth')
const models = require('../../../src/metrics/models')
const { createModels } = require('../../commonTest')

describe('/src/metrics/models.js', () => {
  describe('#models()', () => {
    it('should create without exception if no configurations are passed', () => {
      assert.doesNotThrow(() => {
        const { Model } = createModels()
        const aModels = authModels({Model})
        models({ Model, Users: aModels.Users })
      })
    })
    describe('#UserApiUsage.create()', () => {
      it('should create without exception if no config is passed', () => {
        assert.doesNotThrow(() => {
          const { Model } = createModels()
          const aModels = authModels({Model})
          models({
            Model,
            Users: aModels.Users,
          }).UserApiUsages.create()
        })
      })
    })
  })
})
