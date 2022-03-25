function onHome(req, res) {
	res.render('main', {
		name: req.session.user.name,
		pokemon: req.session.user.pokemon 
	})
}

module.exports = onHome