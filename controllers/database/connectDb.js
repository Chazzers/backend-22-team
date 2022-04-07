const mongoose = require('mongoose')

async function connectDb(uri) {
	try {
		// check and wait for mongoose connection
		await mongoose.connect(uri)
	} catch(error) {
		// if mongoose connection fails
		console.log(error)
		throw error
	}
}

module.exports = connectDb