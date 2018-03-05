'use strict'

const devOptions = {
  host: 'http://127.0.0.1:3000',
  getOpt: {
    mode: 'cors'
  },
  postOpt: {
    mode: 'cors',
    method: 'post',  
    headers: {  
      'Content-type': 'text/plain'
    }
  }
}

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
  let body = data
  fetch(host, {...postOpt, body})
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