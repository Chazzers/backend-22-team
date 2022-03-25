const bcrypt = require('bcrypt')
const User = require('../../models/User.js')

async function onPostLogin(req, res) {
	/*ingevoerde velden (client) */    
	const email = req.body.email
	console.log(email)
	const password = req.body.password
	console.log(password)
	const currentUser = await User.findOne({
		email: email 
	})
	console.log(currentUser)
	//terug hasehen van bycript wachtwoord in database
	bcrypt.compare(password, currentUser.password, (err, result) =>{
		if(result === true) {
			console.log('succes')
			req.session.user = currentUser
			res.redirect('/')
		} else {
			res.redirect('/login')
		}
	}) 
}

module.exports = onPostLogin