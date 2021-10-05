const assert = require('chai').assert

describe('/src/api/index.js', () => {
  it('should load without exception', () => {
    assert.doesNotThrow(() => {
      require('../../../src/api/index')
    })
  })
})
