import addMultipleEventListeners from './addMultipleEventListeners.js'
import likeHandler from './likeHandler.js'
import dislikeHandler from './dislikeHandler.js'
import check from './check.js'
import checkFilled from './checkFilled.js'

// global variables
const likeButtons = document.querySelectorAll('.like-button')
const dislikeButtons = document.querySelectorAll('.dislike-button')
const form = document.getElementById('form')
const likeButtonsArray = [...likeButtons]
const dislikeButtonsArray = [...dislikeButtons]
const loginInput = document.querySelectorAll('.login-input')
const registerInput = document.querySelectorAll('.register-input')


if(loginInput || registerInput) {
	registerInput.forEach(item => item.addEventListener('blur', checkFilled))
	loginInput.forEach(item => item.addEventListener('blur', checkFilled))
}

if(likeButtons) {
	addMultipleEventListeners(likeButtonsArray, 'click', likeHandler)
}

if(dislikeButtons) {
	addMultipleEventListeners(dislikeButtonsArray, 'click', dislikeHandler)
}

if(form) {
	form.addEventListener('submit', check)
}
