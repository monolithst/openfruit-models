const assert = require('chai').assert
const authModels = require('functional-models-auth').models
const models = require('../../../src/api/models')
const { createModels } = require('../../commonTest')

describe('/src/api/models.js', () => {
  describe('#models()', () => {
    it('should create without exception if no configurations are passed', () => {
      assert.doesNotThrow(() => {
        const { Model } = createModels()
        const aModels = authModels({Model})
        models({ Model, Users: aModels.Users })
      })
    })
    describe('#UserApiKeys.create()', () => {
      it('should create without exception if no configurations are passed', () => {
        assert.doesNotThrow(() => {
          const { Model } = createModels()
          const aModels = authModels({Model})
          models({ Model, Users: aModels.Users }).UserApiKeys.create()
        })
      })
    })
  })
})
