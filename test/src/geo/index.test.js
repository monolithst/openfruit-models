const assert = require('chai').assert

describe('/src/geo/index.js', () => {
  it('should load without exception', () => {
    assert.doesNotThrow(() => {
      require('../../../src/geo/index')
    })
  })
})
