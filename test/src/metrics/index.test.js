const assert = require('chai').assert

describe('/src/metrics/index.js', () => {
  it('should load without exception', () => {
    assert.doesNotThrow(() => {
      require('../../../src/metrics/index')
    })
  })
})