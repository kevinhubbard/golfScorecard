const express = require('express');
const router = express.Router();
const Game = require('../models/game.js');

router.get('/', (req,res) => {
	//load db info
	Game.find({}, (err, games) => {
		res.json(games);
	});
});

module.exports = router;