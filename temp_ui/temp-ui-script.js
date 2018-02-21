'use strict'

let testButton = document.querySelector('.test-button')

testButton.addEventListener('click', function (e) {
  e.preventDefault()
  console.log('Btn click')
})