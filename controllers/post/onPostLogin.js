/* bcrypt voor het versleutelen van wachtwoorden
https://www.youtube.com/watch?v=hh45sR9WNH8&ab_channel=ChristianHur
https://github.com/ChristianHur/152-150-Web-Programming-2/tree/master/unit6
*/
const bcrypt = require('bcrypt')
const User = require('../../models/User.js')

async function onPostLogin(req, res) {
	/*ingevoerde velden (client) */    
	const email = req.body.email
	const password = req.body.password
	const currentUser = await User.findOne({
		email: email 
	})
	//terug hashen van bycript wachtwoord in database
	bcrypt.compare(password, currentUser.password, (err, result) =>{
		if(result === true) {
			console.log('succes')
			req.session.user = currentUser
			res.redirect('/')
		} else {
			console.log(err)
			res.redirect('/login')
		}
	}) 
}

module.exports = onPostLogin