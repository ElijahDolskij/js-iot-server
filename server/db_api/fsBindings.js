let fs = require('fs')

module.exports = {
  /**
   * Read data from storage item (file or database entry)
   * @param {string} url - path to data-entry
   * @param {string} id - file name with extension or database-entry id
   * @param {function} startReadFn - callback run after start reading of file
   * @param {function} successReadFn - callback run after success reading
   * @param {function} afterReadFn - callback run after reading and running other callbacks,
   * with data has props
   * @param {string} format - format of data in unicode (utf-8 default)
   */
  readFile: (url, id, startReadFn, successReadFn, afterReadFn, format = 'utf8') => {
    // URL/id должно
    fs.readFile(
      `${url}/${id}`,
      format,
      (error, data) => {
        startReadFn()
        if (error) throw error
        successReadFn()
        afterReadFn(data)
      }
    )
    // Возвращать должен промис
  },
  /**
   * Write data from storage item (file or database entry)
   * @param {string} url - path to data-entry
   * @param {string} id - file name with extension or database-entry id
   * @param {string} data - ready data to write
   * @param {function} successWriteFn - callback run after success writing
   * @param {function} afterWriteFn - callback run after writing and running other callbacks,
   * with data has props
   */
  writeFile: (url, id, data, successWriteFn, afterWriteFn) => {
    fs.writeFile(
      `${url}/${id}`,
      data,
      (error) => {
        if (error) throw(error)
        successWriteFn()
        afterWriteFn()
      }
    )
  }
}