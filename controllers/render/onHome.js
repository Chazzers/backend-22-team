// import mongoose User schema
const User = require('../../models/User.js')

async function onHome(req, res) {
	// find all users and transform to json with .lean()
	const users = await User.find({}).lean()
	// store logged in user in variable
	const currentUser = req.session.user

	// filter unliked users from users array
	const likedUsers = users.filter(user => currentUser.likedUsers.includes(user.email))

	res.render('main', {
		name: req.session.user.name,
		pokemon: req.session.user.pokemon,
		likedUsers: likedUsers
	})
}

module.exports = onHome