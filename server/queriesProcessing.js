let storageApi = require('./db_api/index')
let log = require('./serverEventLogger')

let storApi = storageApi()

module.exports = {
  processGet: (req, res, headers, fileStorePath, fileName, fileExtension) => {
    res.set(
      {
        'ContentType': 'text/plain',
        ...headers
      }
    )

    let fileReadingSuccess = (data) => {
      res.send(data)
      log('Reading is complete. Data sent to client')
    }

    log('Start of data reading')

    storApi.readFile(
      `${fileStorePath}${fileName}.${fileExtension}`
    ).then(
      (data) => {
        console.log(data)
        fileReadingSuccess(data)
      },
      (error) => {throw error}
    )
  },

  processPost: (req, res, headers) => {
    let data = []
    res.set(
      {
        'ContentType': 'text/plain',
        ...headers
      }
    )
    req.on('data', (chunk) => {
      data.push(chunk.toString())
    })

    req.on('end', () => {
      data = JSON.parse(data.join(''))

      let writeComplete = () => {
        res.send(data.testData)
        log('Writing is successfull')
      }

      log('Start of data writing')

      storApi.writeFile(
        './temp_db_store/test.txt',
        data.testData
        )
        .then(
          (data) => writeComplete(data),
          (error) => {throw error}
        )
    })
  }
}