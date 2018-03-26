'use strict'

// Options to fetch connections for all request types
const devOptions = {
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

// Service functions to get and post data methods
const getTextFromServer = ({host, getOpt} = devOptions) => {
  fetch(host, getOpt)
  .then((res) => {
    console.log(res.status)
    return res
  })
  .then((res) => {
    res.text()
    .then((text) => {
      console.log(text)
    })
    .catch((err) => {
      console.log('Text parse error: ', err)
    })
  })
  .catch((err) => {
    console.log('Server error: ', err)
  })
}

const writeTextOnServer = (data, {host, postOpt} = devOptions) => {
  let fullParams = {
    ...postOpt,
    body: JSON.stringify({testData: data})
  }
  fetch(host, fullParams)
  .then((res) => {
    console.log(res.status)
    return res
  })
  .then((res) => {
    res.text()
    .then((text) => {
      console.log(text)
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
let inpToSend = document.querySelector('.input-to-send')

getTextBtn.addEventListener('click', (e) => {
  e.preventDefault()
  getTextFromServer()
})

sendTextBtn.addEventListener('click', (e) => {
  e.preventDefault()
  writeTextOnServer(inpToSend.value)
})