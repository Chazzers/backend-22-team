/* Data model voor de users 
Username
Email
Password
*/

const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
	name: String,
	email: String,
	date: Date,
	password: String,
	pokemon: String,
	likedUsers: Array
})
const User = mongoose.model('User',userSchema)

module.exports = User