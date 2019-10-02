const express = require('express');
const router = express.Router();
const Game = require('../models/game.js');

router.get('/', (req,res) => {
	
	Game.find({}, (err, games) =>{
		if(err) return res.status(500).send('Error occurred: database error.');
		res.json(games);
	});
});

module.exports = router;