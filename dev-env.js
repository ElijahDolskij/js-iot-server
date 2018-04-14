let staticServer = require('serve')
let childProc = require('child_process')

let backEnd = require('./server/index')



module.exports.runDevelopment = {
  // To run front-end-server method
  startFEServer: () => {
    staticServer(__dirname['/temp_ui/'], {
      port: 3001
    })
    childProc.exec('open -a "Google Chrome" http://localhost:3001/temp_ui/')
  },
  // To run backend-end-server method
  startBEServer: backEnd
}