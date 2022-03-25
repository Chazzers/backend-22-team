const mongoose = require('mongoose')

async function connectDb(uri) {
	try {
		await mongoose.connect(uri)
	} catch(error) {
		console.log(error)
		throw error
	}
}

module.exports = connectDb