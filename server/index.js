let express = require('express')
let url = require('url')
let bodyParser = require('body-parser')

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

  // Middleware to parse request data
  app.use(bodyParser.text())

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
        if(error.code === 'ENOENT') res.status(404).send('Not found')
        else res.status(500).send(error.message)
        throw error
      }
    )
  })

  app.get('/get-dir-list', (req, res) => {
    log('Start of reading directory')

    storApi.readDir(
      fileStorePath
      )
      .then((data) => {
        fileReadingEnd(res, data, 'Directory list is received. Data sent to client')
      })
      .catch((error) => {
        if(error.code === 'ENOENT') res.status(404).send('Not found')
        else res.status(500).send(error.message)
        throw error
      })
  })

  app.post('/write-file', (req, res) => {
    let name = JSON.parse(req.body).fileName
    let content = JSON.parse(req.body).newFileData

    let writeComplete = () => {
      res.send(content)
      log('Writing is successfull')
    }

    log('Start of data writing')

    storApi.writeFile(
      `${fileStorePath}${name}.${fileExtension}`,
      content
      )
      .then(
        (data) => writeComplete(data),
        (error) => {throw error}
      )
  })

  app.post('/create-new-dir', (req, res) => {
    let dirName = JSON.parse(req.body).dirName

    let creationComplete = () => {
      res.send(dirName)
      log('New folder is created!')
    }

    log('Try to create folder')

    storApi.createNewDir(
      fileStorePath + dirName
      )
      .then(
        () => creationComplete('Creation is success'),
      )
      .catch(error => {
        let msg = error.message
        if(msg === 'Alredy exitst') {
          res.status(409).send(msg)
        }
        throw error
      })
  })

  // Middleware to log unexpected errors on server-side
  app.use((err) => {
    log(`ERROR: ${err.message}`) // FIXME: Find and resolve error!
  })

  app.listen(3002, '127.0.0.1')

  log('Server running')
}