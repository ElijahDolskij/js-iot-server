const fs = require('fs')

module.exports = {
  /**
   * Read data from storage item (file or database entry)
   * @param {string} url - path to data-entry
   * @param {string} id - file name with extension or database-entry id
   * @param {function} startReadFn - callback run after start reading of file
   * @param {function} successReadFn - callback run after success reading
   * @param {function} afterReadFn - callback run after reading
   * @param {string} format - format of data in unicode
   */
  readFile: (url, id, startReadFn, successReadFn, afterReadFn, format = 'utf8') => {
    fs.readFile(
      `${url}/${id}`,
      format,
      (error, data) => {
        startReadFn()
        if(error) {
          throw error
        }
        successReadFn()
        afterReadFn(data)
      }
    )
  }
}