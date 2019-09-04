const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 8888;

app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req,res) => {
	res.render('index');
});

app.post('/', (req,res) => {
	console.log(req.body)
});

app.listen(port, () => {console.log(`Listening on port: ${port}`)});