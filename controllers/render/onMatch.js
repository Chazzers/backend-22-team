// import mongoose User schema
const User = require('../../models/User.js')

async function onMatch(req, res) {
	try {
		// find all users and transform to json with .lean()
		const users = await User.find({}).lean()
		
		// store logged-in user in variable
		const currentUser = req.session.user

		// filter out the current logged in user from the users array
		const usersWithoutCurrentUser = users.filter(user => user.email !== req.session.user.email)

		// filter out the users that have the same starter pokemon
		const samePokemon = usersWithoutCurrentUser.filter(user => user.pokemon === currentUser.pokemon)

		res.render('match', {
			users: samePokemon
		})
	} catch(err) {
		console.log(err)
	}
}

module.exports = onMatch