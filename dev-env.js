const staticServer = require('serve')
const childProc = require('child_process')

const backEnd = require('./server/index.js')

staticServer(__dirname['/temp_ui/'], {
  port: 3001
})

childProc.exec('open -a "Google Chrome" http://localhost:3001/temp_ui/', backEnd())