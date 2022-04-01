const User = require('../../models/User.js')

async function onMatch(req, res) {
	try {
		const users = await User.find({}).lean()

		console.log(users)
		
		const currentUser = req.session.user

		const usersWithoutCurrentUser = users.filter(user => user.email !== req.session.user.email)

		const samePokemon = usersWithoutCurrentUser.filter(user => user.pokemon === currentUser.pokemon)

		res.render('match', {
			users: samePokemon
		})
	} catch(err) {
		console.log(err)
	}
}

module.exports = onMatch