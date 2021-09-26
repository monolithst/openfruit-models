const assert = require('chai').assert
const {
  HexColorProperty,
  LatinNameProperty,
} = require('../../../src/taxonomy/properties')

describe('/src/taxonomy/properties.js', () => {
  describe('#LatinNameProperty()', () => {
    it('should not throw an exception for creating without a config', () => {
      assert.doesNotThrow(() => {
        LatinNameProperty()
      })
    })
  })
  describe('#HexColorProperty()', () => {
    it('should create an instance without exception without a config', () => {
      assert.doesNotThrow(() => {
        HexColorProperty()
      })
    })
    it('should create an instance without exception with a config', () => {
      assert.doesNotThrow(() => {
        HexColorProperty({})
      })
    })
  })
})
