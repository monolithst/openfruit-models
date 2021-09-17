const assert = require('chai').assert

describe('/src/users/index.js', () => {
  it('should load without exception', () => {
    assert.doesNotThrow(() => {
      require('../../../src/users/index')
    })
  })
})