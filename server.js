const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_26mvj5w7:818ip97apf8gjh0eq5j7gvj5ht@ds217548.mlab.com:17548/heroku_26mvj5w7', {useNewUrlParser: true});
const app = express();
const Game = mongoose.model('Game', {date: Date, courseName: String, totalHoles: Number, hole: Array, totalStrokes: Number, score: Number});
const port = process.env.PORT || 8888;



app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req,res) => {
	res.render('index');
});

app.post('/', (req,res) => {
	console.log(req.body);
	const newGame = new Game({date: Date.now(), courseName: req.body.courseName, totalHoles: req.body.totalHoles, hole: req.body.hole, totalStrokes: req.body.totalStrokes, score: req.body.score});
	newGame.save();

});

app.get('/api', (req,res) =>{

	Game.find({}, (err, games) => {
		res.render('api', {games: games});
	});
	
});

app.get('/json', (req,res) => {
		Game.find({}, (err, games) => {
		res.json(games);
	});
});


app.listen(port, () => {console.log(`Listening on port: ${port}`)});