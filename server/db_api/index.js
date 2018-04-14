let fsApi = require('./fsBindings')
let dbApi = require('./dbBindings')
let storageConfig = require('../configs/server_config')

let storage = storageConfig['storageType']

module.exports = () => {
  if (storage === 'node.js fs') return fsApi
  return dbApi
}