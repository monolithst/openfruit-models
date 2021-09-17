const assert = require('chai').assert
const { hexColorField, latinNameField, } = require('../../../src/taxonomy/fields')

describe('/src/taxonomy/fields.js', () => {
  describe('#latinNameField()', () => {
    it('should not throw an exception for creating without a config', () => {
      assert.doesNotThrow(() => {
        latinNameField()
      })
    })
  })
  describe('#hexColorField()', () => {
    it('should create an instance without exception without a config', () => {
      assert.doesNotThrow(() => {
        hexColorField()
      })
    })
    it('should create an instance without exception with a config', () => {
      assert.doesNotThrow(() => {
        hexColorField({})
      })
    })
  })
})