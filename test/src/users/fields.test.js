const assert = require('chai').assert
const { nameField } = require('../../../src/users/fields')

describe('/src/users/fields.js', () => {
  describe('#nameField()', () => {
    it('should create without exception if no configurations are passed', () => {
      assert.doesNotThrow(() => {
        nameField()
      })
    })
    it('should create without exception if configurations are passed', () => {
      assert.doesNotThrow(() => {
        nameField({})
      })
    })
  })
})