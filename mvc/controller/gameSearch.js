const express = require('express');
const router = express.Router();
const Game = require('../models/game.js');

router.get('/', (req,res) => {
	//load db info
	Game.find({}, (err, games) => {
		if(err) return res.status(500).send('Error occurred: database error.');
		const list = [];
		
		for (var i = 0; i < games.length; i++) {
			let course = games[i].courseName.toLowerCase();

			if(list.includes(course)) {
				console.log('couse included');
			} else {
				list.push(course);
			}
		}
		res.render('gameSearch', {courses: list});
		
	});

});

router.get('/courses', (req,res) => {
	
	Game.find({'courseName': req.query.course}, (err, list) => {
		if(err) return res.status(500).send('Error occurred: database error.');

		console.log(list);
		res.render('course', {course: list});
	});
});

module.exports = router;