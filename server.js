const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const app = express();

const index = require('./routes/index.js');
const scores = require('./routes/scores.js');

const port = process.env.PORT || 8888;



app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/', index);
app.use('/scores', scores);



app.get('/json', (req,res) => {
		Game.find({}, (err, games) => {
		res.json(games);
	});
});


app.listen(port, () => {console.log(`Listening on port: ${port}`)});