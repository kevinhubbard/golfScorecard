const express = require('express');
const app = express();

const port = process.env.PORT || 8888;

app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
	res.render('index');
});

app.listen(port, () => {console.log(`Listening on port: ${port}`)});