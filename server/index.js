let http = require('http')

let serverConfig = require('./configs/server_config')
let storageApi = require('./db_api/index')
let log = require('./serverEventLogger')

let storApi = storageApi()
let responseOptions = serverConfig['responseOptions']

log('Server running')

module.exports = server = () => http.createServer((req, res) => {

  // GET request processing function
  let processGet = () => {
    res.writeHead(200,
      {
        'ContentType': 'text/plain',
        ...responseOptions['devHeaders']
      }
    )

    let fileReadingSuccess = (data) => res.end(data, () => log('Data sent to user'))

    log('Start of reading')

    storApi.readFile(
      './temp_db_store/test.txt'
    ).then(
      (data) => fileReadingSuccess(data),
      (error) => {throw error}
    )
  }

  // POST request processing function
  let processPost = () => {
    let data = []
    res.writeHead(200,
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

      let writeComplete = () => res.end('File data was saved: ' + data.testData)

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

  if (req.method === 'GET') processGet()
  else if (req.method === 'POST') processPost()

}).listen(3002, '127.0.0.1')