const bcrypt = require('bcrypt')
const User = require('../../models/User.js')

async function onPostRegister(req, res) {
	//res.render('register');
	try {
		/* hashed password, password wordt 10 gehashed door await */
		const hashedPassword = await bcrypt.hash(req.body.password, 10)
		console.log(hashedPassword)
		console.log('name = '+ req.body.name,
			'email = '+ req.body.email,
			'date = '+ req.body.date,
			'password '+ hashedPassword,
			'pokemon of choice '+ req.body.pokemon)
		await User.create({
			/* Haalt de gegevens uit het formulier en plaatst deze in de users array (name in het form)*/
			name: req.body.name,
			email: req.body.email,
			date: req.body.date,
			password: hashedPassword,
			pokemon: req.body.pokemon
		})
		res.redirect('/login')
       
	} catch(err) {
		console.log(err)
		res.redirect('/register')
	}
}

module.exports = onPostRegister