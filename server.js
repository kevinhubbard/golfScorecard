const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8888;

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//load routes modules
const index = require('./controller/index.js');
const scores = require('./controller/scores.js');
const api = require('./controller/api.js');

app.use('/', index);
app.use('/scores', scores);
app.use('/api', api);

//start server
app.listen(port, () => {console.log(`Listening on port: ${port}`)});