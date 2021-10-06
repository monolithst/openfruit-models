const { getObjToArray } = require('../utils')

const MODEL_NAMES = getObjToArray(['UserApiKeys'])

const MEMBERSHIPS = getObjToArray([
  'Free',
  'Bronze',
  'Silver',
  'Gold',
])

module.exports = {
  MODEL_NAMES,
  MEMBERSHIPS
}
