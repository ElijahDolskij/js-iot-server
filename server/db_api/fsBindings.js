let fs = require('fs')

module.exports = {
  /**
   * Read data from storage item (file or database entry)
   * @param {string} url - path to data-entry
   */
  readFile: (url) => {
    return new Promise((res, rej) => {
      fs.readFile(
        url,
        'utf-8',
        (error, data) => {
          if (error) return rej(error)
          res(data)
        }
      )
    })
  },
  /**
   * Write data from storage item (file or database entry)
   * @param {string} url - path to data-entry
   * @param {string} data - ready data to write
   * with data has props
   */
  writeFile: (url, data) => {
    return new Promise((res, rej) => {
      fs.writeFile(
        url,
        data,
        (error) => {
          if (error) return rej(error)
          res()
        }
      )
    })
  }
}