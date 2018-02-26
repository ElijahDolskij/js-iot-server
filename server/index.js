let http = require('http')
let fs = require('fs')

let serverOptions = require('./server_options.js')




console.log('Server running')

module.exports = server = () => http.createServer((req, res) => {

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
      console.log('Start of reading')
      if(error) {
        throw error
      }
      console.log('File-data read successfully')
      res.end(data, () => console.log('Data sent to user'))
    }
  )

}).listen(3000, '127.0.0.1')