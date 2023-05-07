const crypto = require('crypto')

const randomString = (length) => crypto.randomBytes(length).toString('base64url')

module.exports = { randomString }
