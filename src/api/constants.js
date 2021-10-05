const { getObjToArray } = require('../utils')

const MODEL_NAMES = getObjToArray(['UserApiKeys'])

const ROLES = getObjToArray([
  'Readonly',
  'Contributor',
  'Power-Contributor',
  'Admin',
])

const MEMBERSHIPS = getObjToArray([
  'Free',
  'Bronze',
  'Silver',
  'Gold',
])

module.exports = {
  MODEL_NAMES,
  ROLES,
  MEMBERSHIPS
}
