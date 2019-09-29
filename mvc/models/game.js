const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://heroku_26mvj5w7:818ip97apf8gjh0eq5j7gvj5ht@ds217548.mlab.com:17548/heroku_26mvj5w7', {useNewUrlParser: true,  useUnifiedTopology: true});
const db = mongoose.connection;

const gameSchema = new Schema({
	courseName: String,
	totalHoles: Number,
	hole: [{_id: false, hole: Number, par: Number, strokes: Number}],
	totalStrokes: Number,
	score: Number,
	date: { type: Date, default: Date.now }
});

const Game = db.model('Game', gameSchema);

module.exports = Game;

