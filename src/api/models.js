const {
  TextProperty,
  ReferenceProperty,
  Function,
} = require('functional-models')
const { ormQuery, validation } = require('functional-models-orm')
const { MODEL_NAMES } = require('./constants')

const models = ({ Model, Users, dataLayer, fetcher = undefined }) => {

  const UserApiKeys = Model(MODEL_NAMES.UserApiKeys, {
    user: ReferenceProperty(Users, { fetcher, required: true }),
    apiKey: TextProperty({ required: true }),
  }, {
    modelValidators: [
      validation.uniqueTogether(['user', 'apiKey'])
    ],
    instanceFunctions: {
      save: (saveMethod) => () => {
        const saved = saveMethod()

        return saved
      }
    },
    modelFunctions: {
      getUserByApiKey: dataLayer.getUserByApiKey,
      createApiKeyFlow: dataLayer.createApiKeyFlow,
      /*
      getUserByApiKey: async (key, model) => {
        const query = ormQuery.ormQueryBuilder()
          .property('apiKey', key)
          .take(1)
          .compile()
        const apiKeyObj = (await model.search(query)).instances[0]
        if (!apiKeyObj) {
          return undefined
        }
        const userId = await apiKeyObj.meta.references.getUserId()
        const query2 = ormQuery.ormQueryBuilder()
          .property('id', userId)
          .take(1)
          .compile()
        return (await Users.search(query2)).instances[0]
      }
      */
    }
  })
  return {
    UserApiKeys,
  }
}

module.exports = models
