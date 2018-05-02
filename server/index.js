let express = require('express')

let serverConfig = require('./configs/server_config')
let storageApi = require('./db_api/')
let log = require('./serverEventLogger')

let app = express()
let storApi = storageApi()
let responseOptions = serverConfig['responseOptions']

module.exports = server = () => {
  app.get('/', (req, res) => {
    // GET request processing function
    console.log(req.url)
    let processGet = () => {
      res.set(
        {
          'ContentType': 'text/plain',
          ...responseOptions['devHeaders']
        }
      )

      let fileReadingSuccess = (data) => {
        res.send(data)
        log('Reading is complete. Data sent to client.')
      }

      log('Start of data reading')

      storApi.readFile(
        './temp_db_store/test.txt'
      ).then(
        (data) => fileReadingSuccess(data),
        (error) => {throw error}
      )
    }

    processGet()
  })

  app.post('/', (req, res) => {
    // POST request processing function
    let processPost = () => {
      let data = []
      res.set(
        {
          'ContentType': 'text/plain',
          ...responseOptions['devHeaders']
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

    processPost()
  })

  app.listen(3002, '127.0.0.1')

  log('Server running')
}