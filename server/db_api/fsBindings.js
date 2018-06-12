let fs = require('fs')
let fsEx = require('fs-extra')

module.exports = {
  readFile: (url) => fsEx.readFile(url, 'utf-8'),
  writeFile: (url, data) => fsEx.outputFile(url, data),
  readDir: path => fsEx.readdir(path),
  createNewDir: dirName => {
    return new Promise((res, rej) => {
      fs.stat(dirName, (err) => {
        if (err) {
          res(fsEx.ensureDir(dirName))
        } else {
          rej(new Error('Alredy exitst!'))
        }
      })
    })
  }
}