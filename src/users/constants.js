const { getObjToArray } = require('../utils')

const MAX_NAME_LENGTH = 50
const MIN_NAME_LENGTH = 50
const MAX_EMAIL_LENGTH = 100

const MODEL_NAMES = getObjToArray(['Users', 'UserApiKeys'])

module.exports = {
  MAX_NAME_LENGTH,
  MIN_NAME_LENGTH,
  MAX_EMAIL_LENGTH,
  MODEL_NAMES,
}
