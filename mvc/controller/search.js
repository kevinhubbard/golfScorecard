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
				//nothing needs to be done
			}
			else {
				list.push(course);
			}
		}
		res.render('search', {courses: list});
		
	});

});

router.get('/course', (req,res) => {
	console.log(req.query.course);
	Game.find({'courseName': new RegExp('^'+req.query.course+'$', "i")}, (err, list) => {
		if(err) return res.status(500).send('Error occurred: database error.');
		res.render('course', {course: list});
	});
});

module.exports = router;