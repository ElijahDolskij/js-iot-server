'use strict'

// Options to fetch connections for all request types
const DEV_OPTIONS = {
  host: 'http://127.0.0.1:3002',
  getOpt: {
    mode: 'cors'
  },
  postOpt: {
    mode: 'cors',
    method: 'post',
    headers: new Headers()
  }
}

let checkInps = (...inputs) => {
  return !(inputs.some((inp) => {
    if (!inp.value) {
      alert(`Please enter "${inp.getAttribute('data-inp')}" field!`)
      inp.focus()
      return true
    }
  }))
}

// Service functions to get and post data methods
let getTextFromServer = (fileName, {host, getOpt} = DEV_OPTIONS) => {
  host = `${host}/read-file?${fileName}`
  fetch(host, getOpt)
  .then((res) => {
    console.info(`Response status: ${res.status}`)
    if (res.status === 404) {
      alert(`File "${fileName}" does not exist. Enter name of existing file.`)
      throw Error('not found')
    } else if (res.status !== 200) {
      alert('Server error')
      throw Error(`${res.statusText}: ${res.status}`)
    }
    return res.text()
  })
  .then((text) => {
    console.log(`File data from server: ${text}`)
  })
}

let writeTextOnServer = (filename, data, {host, postOpt} = DEV_OPTIONS) => {
  let fullParams = {
    ...postOpt,
    host: `${host}/write-file`,
    body: JSON.stringify({
      fileName: filename,
      newFileData: data,
    })
  }

  fetch(host, fullParams)
  .then((res) => {
    console.info(`Response status: ${res.status}`)
    return res
  })
  .then((res) => {
    res.text()
    .then((text) => {
      console.log(`Next data sent to server: ${text}`)
    })
    .catch((err) => {
      console.log('Text parse error: ', err)
    })
  })
  .catch((err) => {
    console.log('Server error: ', err)
  })
}
// END service functions to get and post data methods

let getTextBtn = document.querySelector('.get-text')
let sendTextBtn = document.querySelector('.send-text')
let fileNameInp = document.querySelector('.file-name')
let fileDataArea = document.querySelector('.file-data')

getTextBtn.addEventListener('click', (e) => {
  e.preventDefault()
  if (checkInps(fileNameInp)) getTextFromServer(fileNameInp.value)
})

sendTextBtn.addEventListener('click', (e) => {
  e.preventDefault()
  if (checkInps(fileNameInp, fileDataArea)) {
    writeTextOnServer(fileNameInp.value, fileDataArea.value)
  }
})