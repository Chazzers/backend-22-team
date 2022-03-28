function onLogin(req, res) {
	console.log(req.route)
	const port = process.env.PORT || 1337
	console.log(`${req.protocol}://${req.hostname}:${port}${req.url}`)
	res.render('login')
}

module.exports = onLogin