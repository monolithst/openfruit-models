const { TextProperty } = require('functional-models')
const { MEMBERSHIPS } = require('./constants')

const MembershipProperty = (config={}) => TextProperty({
  defaultValue: MEMBERSHIPS.Free,
  ...config,
  required: true,
  choices: MEMBERSHIPS.toArray(),
})

module.exports = {
  MembershipProperty
}
