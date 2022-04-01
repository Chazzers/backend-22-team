const User = require('../../models/User.js')

async function onHome(req, res) {
	const users = await User.find({}).lean()
	const currentUser = req.session.user

	const likedUsers = users.filter(user => currentUser.likedUsers.includes(user.email))

	res.render('main', {
		name: req.session.user.name,
		pokemon: req.session.user.pokemon,
		likedUsers: likedUsers
	})
}

module.exports = onHome