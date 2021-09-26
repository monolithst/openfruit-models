const assert = require('chai').assert
const { NameProperty } = require('../../../src/users/properties')

describe('/src/users/properties.js', () => {
  describe('#NameProperty()', () => {
    it('should create without exception if no configurations are passed', () => {
      assert.doesNotThrow(() => {
        NameProperty()
      })
    })
    it('should create without exception if configurations are passed', () => {
      assert.doesNotThrow(() => {
        NameProperty({})
      })
    })
  })
})
