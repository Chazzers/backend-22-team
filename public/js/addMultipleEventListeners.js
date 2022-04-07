// function that takes the parameters on call array, interaction string i.e. 'click', and a callback function like an interaction handler. It will take an array of html elements and put eventlisteners on the html elements.
function addMultipleEventListeners(array, interaction, callBack) {
	array.forEach(item => item.addEventListener(interaction, callBack))
}

export default addMultipleEventListeners