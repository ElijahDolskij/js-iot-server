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
let getTextFromServer = (fileUrl, {host, getOpt} = DEV_OPTIONS) => {
  host = `${host}?${fileUrl}`
  fetch(host, getOpt)
  .then((res) => {
    console.info(`Response status: ${res.status}`)
    return res
  })
  .then((res) => {
    res.text()
    .then((text) => {
      console.log(`File data from server: ${text}`)
    })
    .catch((err) => {
      console.error(`Text parse error: ${err}`)
    })
  })
  .catch((err) => {
    console.error('Server error: ', err)
  })
}

let writeTextOnServer = (data, {host, postOpt} = DEV_OPTIONS) => {
  let fullParams = {
    ...postOpt,
    body: JSON.stringify({testData: data})
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
  writeTextOnServer(fileDataArea.value) //TODO: only depending on check result
})