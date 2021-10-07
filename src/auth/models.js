const { MembershipProperty } = require('../api/properties')

const models = ({}) => {

  const getExtendedUserProperties = () => ({
    membership: MembershipProperty()
  })

  return {
    getExtendedUserProperties,
  }
}

module.exports = models

