const assert = require('chai').assert
const { getObjToArray } = require('../../src/utils')

describe('/src/utils.js', () => {
  describe('#getObjToArray()', () => {
    it('should have an object with a toArray function', () => {
      const input = ['TestA', 'TestB']
      const actual = getObjToArray(input)
      assert.isFunction(actual.toArray)
    })
    describe('#toArray()', () => {
      it('should return an identical array to what is passed in', () => {
        const input = ['TestA', 'TestB']
        const actual = getObjToArray(input).toArray()
        assert.deepEqual(actual, input)
      })
    })
  })
})