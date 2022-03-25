/* routes*/
const express = require('express')
const app = express()
/* bcrypt voor het versleutelen van wachtwoorden
https://www.youtube.com/watch?v=hh45sR9WNH8&ab_channel=ChristianHur
https://github.com/ChristianHur/152-150-Web-Programming-2/tree/master/unit6
*/
const exphbs = require('express-handlebars').engine 

require('dotenv').config()

/* Port leet \,,/ (^.^) \,,/ */
const PORT = process.env.PORT || 1337

// controller database functions
const connectDb = require('./controllers/database/connectDb.js')

// controller render functions
const onHome = require('./controllers/render/onHome.js')
const onLogin = require('./controllers/render/onLogin.js')
const onAbout = require('./controllers/render/onAbout.js')
const onRegister = require('./controllers/render/onRegister.js')
const onNotFound = require('./controllers/render/onNotFound.js')


// controller post functions
const onPostLogin = require('./controllers/post/onPostLogin.js')
const onPostRegister = require('./controllers/post/onPostRegister.js')


connectDb(process.env.DATABASE_URI)

/* voor de statische bestanden zoals css en afbeeldingen */
app.use(express.static(__dirname + '/public'))

// voor het versturen van gegevens */
app.use(express.urlencoded({
	extended: false 
}))

/* mongoose en mongodb voor een database connectie */
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()  
}

// const db = mongoose.connection;
// db.on('error', error => console.error(error));
// db.once('open', () => console.log('connected to mongoose'));

/* inloggen */
const session = require('express-session')
const path = require('path')

app.use(session({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: {
		secure: false 
	}
}))

app.use(express.json())
app.use(express.urlencoded({
	extended: true 
}))
app.use(express.static(path.join(__dirname, 'static')))
app.use((req, res, next) => {
	//wanneer je op de site komt en de route is gelijk aan register of login
	if (req.path === '/login' || req.path === '/register') {
		next()
	} 
	//wanneer er niets staat in de session (wanneer er een gebruiker niet ingelogd is of andere pagina bereikt heeft)
	else if (req.session.user === undefined){
		res.redirect('/login')
	} else {
		next()
	}
})

/* handlebars settings */
app.set('view engine', 'hbs')
app.engine('hbs', exphbs({
	extname: 'hbs',
	defaultLayout: 'index',
	layoutsDir: __dirname + '/views/layouts',
	partialsDir: __dirname + '/views/partials',
}))

app.get('/', onHome)
app.get('/about', onAbout)
app.get('/register', onRegister)
app.get('/login', onLogin)
app.get('*', onNotFound)

app.post('/register', onPostRegister)
app.post('/login', onPostLogin)

/* async wordt gebruikt omdat het een await bevat hierdoor kan het verder met de code*/ 

app.listen(PORT, () => {
	console.log(`server running on port: http://localhost:${PORT}`)
}) 


/*
Andere mannier van routes plaatsen
app.get('/', (req, res) => {
    res.status(200).send('<h1>200! Hello world</h1>');
});
*/
/* linkjes
https://handlebarsjs.com/installation/#npm-or-yarn-recommended
https://expressjs.com/
*/

