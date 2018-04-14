module.exports = serverEventLogger = (logEvent) => {
  let d = new Date()
  let checkFormat = (val) => (val < 10) ? `0${val}` : val
  console.info(`${checkFormat(d.getHours())}:${checkFormat(d.getMinutes())}:${checkFormat(d.getSeconds())} server log event: "${logEvent}"`)
}