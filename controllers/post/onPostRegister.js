const bcrypt = require('bcrypt')
const User = require('../../models/User.js')
const nodemailer = require('nodemailer')

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

		let transporter = nodemailer.createTransport({
			host: 'smtp.ethereal.email',
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: req.body.name, // generated ethereal user
				pass: req.body.password, // generated ethereal password
			},
		})
		let url = 'http://localhost:1337/login'
		if(process.env.PRODUCTION) {
			url = ''//heroku url
		}
		let info = await transporter.sendMail({
			from: '"Pokemon Match 🔥" <register@pokemonmatch.com>', // sender address
			to: req.body.email, // list of receivers
			subject: 'Welcome to Pokemon Match!', // Subject line
			//text: 'Hello world?', // plain text body
			html: `<h1>Hello ${req.body.name}</h1>
			<h2>Thanks for signing up!</h2>
			<p> You can now <a href="${url}">login here!</a></p>
			<p> Here is your login information: </p>
			<ul>
				<li><b> Email: </b> ${req.body.email}</li>
				<li><b> Password: </b> ${req.body.password} </li>
			 </ul>
			 <p> Enjoy your time and have fun! </p>
			` // html body
		})

		


		res.redirect('/login')
       
	} catch(err) {
		console.log(err)
		res.redirect('/register')
	}
}

module.exports = onPostRegister