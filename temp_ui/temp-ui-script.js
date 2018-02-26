'use strict'

let testButton = document.querySelector('.test-button')

const devOptions = {
  host: 'http://127.0.0.1:3000',
  fetchOpt: {
    mode: 'cors'
  }
}

const getTextFromServer = (reqOtions = devOptions) => {
  fetch(reqOtions.host, reqOtions.fetchOpt)
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

testButton.addEventListener('click', function (e) {
  e.preventDefault()
  getTextFromServer()
})