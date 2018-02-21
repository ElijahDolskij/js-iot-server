let http = require('http')

module.exports = server = () => http.createServer((req, res) => {
  res.writeHead(200, {'ContentType': 'text/plain'})
  res.end('Velcome!')
}).listen(3000)