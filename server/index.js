const http = require('http')

const serverOptions = require('./server_options.js')
const storageApi = require('./db_api/index.js')
const log = require('./serverEventLogger.js')

const storApi = storageApi()

log('Server running')

module.exports = server = () => http.createServer((req, res) => {

  // GET request processing function
  const processGet = () => {
    res.writeHead(200,
      {
        'ContentType': 'text/plain',
        ...serverOptions.devHeaders
      }
    )

    /*fs.readFile(
      './temp_db_store/test.txt',
      'utf8',
      (error, data) => {
        log('Start of reading')
        if(error) {
          throw error
        }
        log('File-data read successfully')
        res.end(data, () => log('Data sent to user'))
      }
    )*/

    let readStart = () => log('Start of reading')
    let readEnd = () => log('File-data read successfully')
    let afterRead = (data) => res.end(data, () => log('Data sent to user'))

    storApi.readFile(
      './temp_db_store/',
      'test.txt',
      readStart,
      readEnd,
      afterRead
    )
  }

  // POST request processing function
  const processPost = () => {
    let data = []
    res.writeHead(200,
      {
        'ContentType': 'text/plain',
        ...serverOptions.devHeaders
      }
    )
    req.on('data', (chunk) => {
      data.push(chunk.toString())
    })

    req.on('end', () => {
      data = JSON.parse(data.join(''))

      fs.writeFile('./temp_db_store/test.txt', data.testData, (err) => {
        if (err) {
            log(err)
        }

        log("File data was saved!")
        res.end('File data was saved: ' + data.testData)
      })
    })
  }

  if (req.method === 'GET') processGet()
  else if (req.method === 'POST') processPost()

}).listen(3002, '127.0.0.1')