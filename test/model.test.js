const assert = require('chai').assert
const models = require('../src/models')

describe('/src/models.js', () => {
  it('should throw an exception if no orm is provided', () => {
    assert.throws(() => {
      models({ orm: null })
    })
  })
})
