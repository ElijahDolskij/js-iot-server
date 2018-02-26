let http = require('http')
let serverOptions = require('./server_options.js')

console.log('Server running')

module.exports = server = () => http.createServer((req, res) => {

  res.writeHead(200,
    {
      'ContentType': 'text/plain',
      ...serverOptions.devHeaders
    }
  )
  res.end('Velcome!')

}).listen(3000, '127.0.0.1')