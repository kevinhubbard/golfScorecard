const express = require('express');
const router = express.Router();
const Game = require('../models/game');

router.get('/', (req,res) => {
	//lookup games in db
	Game.find({}, (err, games) => {
		res.render('scores', {games: games});
	});
});

module.exports = router;