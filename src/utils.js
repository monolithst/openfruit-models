const { v4: createUuid } = require('uuid')

const HEX = 16
const FOUR = 4
const FIFTEEN = 15

const createUUID = () => {
  const cryptoToUse = window.crypto || window.msCrypto
  // eslint-disable-next-line no-magic-numbers
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (cryptoToUse.getRandomValues(new Uint8Array(1))[0] & (FIFTEEN >> (c / FOUR)))
    ).toString(HEX)
  )
}

module.exports = {
  createUuid,
}

