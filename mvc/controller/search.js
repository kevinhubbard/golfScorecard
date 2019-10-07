const express = require('express');
const router = express.Router();
const Game = require('../models/game.js');

router.get('/', (req,res) => {
	//load db info
	Game.find({}, (err, games) => {
		if(err) return res.status(500).send('Error occurred: database error.');
		const courses = [];
		const date = [];
		
		for (var i = 0; i < games.length; i++) {
			let course = games[i].courseName.toLowerCase();

			if(courses.includes(course)) {
				//nothing needs to be done
			}
			else {
				courses.push(course);
			}
		}

		for (var d = 0; d < games.length; d++) {
			if(date.includes(games[d].date)){

			} else {
				date.push(games[d].date);
			}
			
		}

		res.render('search', {courses: courses, date: date});
		
	});

});

router.get('/course', (req,res) => {
	console.log(req.query.course);

	Game.find({'courseName': new RegExp('^'+req.query.course+'$', "i")}, (err, list) => {
		if(err) return res.status(500).send('Error occurred: database error.');
		res.render('course', {course: list});
	});	
});


router.get('/date', (req,res) => {

	Game.find({'date': (req.query.date)}, (err, games) => {
		if(err) return res.status(500).send('Error occurred: database error.');

		res.render('date', {games: games});
	});
});

module.exports = router;