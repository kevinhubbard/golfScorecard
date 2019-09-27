const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
	res.render('index');
});

router.post('/', (req,res) => {
	console.log(req.body);
	const newGame = new Game({date: Date.now(), courseName: req.body.courseName, totalHoles: req.body.totalHoles, hole: req.body.hole, totalStrokes: req.body.totalStrokes, score: req.body.score});
	newGame.save();
});

module.exports = router;