const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8888;

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));
app.set('views', __dirname + '/mvc/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//load routes modules
const index = require('./mvc/controller/index.js');
const scores = require('./mvc/controller/scores.js');
const api = require('./mvc/controller/api.js');
const search = require('./mvc/controller/search.js');

app.use('/', index);
app.use('/scores', scores);
app.use('/api', api);
app.use('/search', search);
app.use((req,res,next) => {
	res.status(404).render('404');
});

//start server
app.listen(port, () => {console.log(`Listening on port: ${port}`)});