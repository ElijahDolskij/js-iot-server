const fsApi = require('./fsBindings.js')
// const dbApi = require('./dbBindings.js')


module.exports = (storageType = 'node fs') => {
  if (storageType === 'node fs') return fsApi
}