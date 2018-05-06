let express = require('express')
let url = require('url')

let qProcess = require('./queriesProcessing')
let serverConfig = require('./configs/server_config')
let log = require('./serverEventLogger')

let app = express()
let headers = serverConfig['responseOptions']['devHeaders']

module.exports = server = () => {
  app.get('/', (req, res) => {
    let fileName = decodeURI(url.parse(req.url).query)
    let dataStorePath = './temp_db_store/'
    let fileExt = 'txt'

    qProcess.processGet(
      req,
      res,
      headers,
      dataStorePath,
      fileName,
      fileExt
    )
  })

  app.post('/', (req, res) => qProcess.processPost(
    req,
    res,
    headers
  ))

  app.listen(3002, '127.0.0.1')

  log('Server running')
}