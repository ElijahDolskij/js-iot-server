let express = require('express')
let url = require('url')

let serverConfig = require('./configs/server_config')
let log = require('./serverEventLogger')
let storageApi = require('./db_api/index')

let app = express()
let headers = serverConfig['responseOptions']['devHeaders']
let storApi = storageApi()

let fileStorePath = './temp_db_store/'
let fileExtension = 'txt'

/**
 * Send data to client and log this process with custom message on sercer-side
 * @param response {object}
 * @param data {string}
 * @param logMessage {string} A message to log sending event
 */
let fileReadingEnd = (response, data, logMessage = 'Default: Response sent to client') => {
  response.send(data)
  if (logMessage) log(logMessage)
}

module.exports = server = () => {
  // Middleware to set headers
  app.use((req, res, next) => {
    res.set(
      {
        'ContentType': 'text/plain',
        ...headers
      }
    )
    next()
  })

  app.get('/read-file', (req, res) => {
    let fileName = (req.url) ? decodeURI(url.parse(req.url).query) : null

    log('Start of data reading')

    storApi.readFile(
      `${fileStorePath}${fileName}.${fileExtension}`
    )
    .then(
      (data) => {
        fileReadingEnd(res, data, 'Reading is complete. Data sent to client')
      }
    )
    .catch(
      (error) => {
        res.status(404).send('Not found')
        throw error
      }
    )
  })

  app.post('/', (req, res) => {
    let data = []

    req.on('data', (chunk) => {
      data.push(chunk.toString())
    })

    req.on('end', () => {
      data = JSON.parse(data.join(''))

      let writeComplete = () => {
        res.send(data.newFileData)
        log('Writing is successfull')
      }

      log('Start of data writing')

      storApi.writeFile(
        `${fileStorePath}${data.fileName}.${fileExtension}`,
        data.newFileData
        )
        .then(
          (data) => writeComplete(data),
          (error) => {throw error}
        )
    })
  })

  // Middleware to log unexpected errors on server-side
  app.use((err) => {
    log(err.message)
  })

  app.listen(3002, '127.0.0.1')

  log('Server running')
}