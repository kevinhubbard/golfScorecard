const express = require('express');
const router = express.Router();
const Game = require('../models/game.js');

router.get('/', (req,res) => {
	res.render('index');
});

router.post('/', (req,res) => {
	const newGame = new Game({
		date: req.body.date, 
		courseName: req.body.courseName, 
		totalHoles: req.body.totalHoles, 
		hole: req.body.hole, 
		totalStrokes: req.body.totalStrokes, 
		score: req.body.score
	});
	
	newGame.save();
});

module.exports = router;