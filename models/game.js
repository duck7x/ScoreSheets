var mongoose = require("mongoose");

var gameSchema = new mongoose.Schema({
	name: String,
	image: String,
	minPlayers: Number,
	maxPlayers: Number,
	winCondition: String,
	tieBreaker: String,
	fields: { type : Array , "default" : [] }
	// fields: [{
	// 	name: String,
	// 	value: Number,
	// 	title: String,
	// 	type: String,
	// 	icon: String,
	// 	description: String,
	// 	classesDesc: String,
	// 	classesPlayer: String,
	// 	calcMethod: String,
	// 	scoreTotal: Boolean
	// }]
});

module.exports = mongoose.model("Game", gameSchema);