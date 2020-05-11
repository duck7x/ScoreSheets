var mongoose = require("mongoose");

var gameSchema = new mongoose.Schema({
	name: String,
	image: String
});

module.exports = mongoose.model("Game", gameSchema);