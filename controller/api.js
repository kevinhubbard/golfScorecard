const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
/*const Game = mongoose.model('Game', {date: Date, courseName: String, totalHoles: Number, hole: Array, totalStrokes: Number, score: Number});
mongoose.connect('mongodb://heroku_26mvj5w7:818ip97apf8gjh0eq5j7gvj5ht@ds217548.mlab.com:17548/heroku_26mvj5w7', {useNewUrlParser: true});

router.get('/', (req,res) => {
	//load db info
	Game.find({}, (err, games) => {
		res.json(games);
	});
});

module.exports = router;*/