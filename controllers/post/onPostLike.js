// import mongoose User schema
const User = require('../../models/User.js')

async function onPostLike(req, res) {
	try {
		// properties from logged in user
		const { email, likedUsers } = req.session.user

		// user-email from submitted form
		const { newLike } = req.body

		// find logged-in user in database
		const currentUser = await User.findOne({
			email: email
		})

		// push new liked game to the likedUsers array
		likedUsers.push(newLike)
		
		// update the logged-in users likedUsers array
		req.session.user.likedUsers = likedUsers
		
		// update the logged-in users likedUsers array
		await currentUser.updateOne({
			'likedUsers': likedUsers
		})

		// redirect back to match page
		res.redirect('/match')
	} catch(err) {
		return err
	}
}

module.exports= onPostLike