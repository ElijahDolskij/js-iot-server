const http = require('http')
const fs = require('fs')

const serverOptions = require('./server_options.js')

const serverEventLogger = (logEvent) => {
  const d = new Date()
  const checkFormat = (val) => (val < 10) ? `0${val}` : val
  console.info(`${checkFormat(d.getHours())}:${checkFormat(d.getMinutes())}:${checkFormat(d.getSeconds())} server log event: "${logEvent}"`)
}

serverEventLogger('Server running')

module.exports = server = () => http.createServer((req, res) => {

  if (req.method === 'GET') {
    res.writeHead(200,
      {
        'ContentType': 'text/plain',
        ...serverOptions.devHeaders
      }
    )
  
    fs.readFile(
      './temp_db_store/test.txt',
      'utf8', 
      (error, data) => {
        serverEventLogger('Start of reading')
        if(error) {
          throw error
        }
        serverEventLogger('File-data read successfully')
        res.end(data, () => serverEventLogger('Data sent to user'))
      }
    )
  } else if (req.method === 'POST') {
    res.writeHead(200,
      {
        'ContentType': 'text/plain',
        ...serverOptions.devHeaders
      }
    )
    res.end('POST!')
  }

}).listen(3000, '127.0.0.1')