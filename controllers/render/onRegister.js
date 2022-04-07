const fetch = require('node-fetch')
async function onRegister(req, res) {
	//voor de apifunctie
	//Fetch de gegevens van alleen 1 pokemon, in dit geval bulbasaur
	//Gegevens zijn van alles en nogwat (afbeeldingen, moves, generatie en nog meer)
	const responseBulbasaur = await fetch('https://pokeapi.co/api/v2/pokemon/bulbasaur')
	const responseCharmander = await fetch('https://pokeapi.co/api/v2/pokemon/charmander')
	const responseSquirtle = await fetch('https://pokeapi.co/api/v2/pokemon/squirtle')
	//Wacht totdat gegevens geladen zijn
	const dataBulbasaur = await responseBulbasaur.json()
	const dataCharmander = await responseCharmander.json()
	const dataSquirtle = await responseSquirtle.json()

	res.render('register', {
		//Verstuur de data naar register form.
		bulbasaur: dataBulbasaur,
		charmander: dataCharmander,
		squirtle: dataSquirtle
	})
}

module.exports = onRegister