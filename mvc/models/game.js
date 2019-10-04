const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true,  useUnifiedTopology: true});
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

