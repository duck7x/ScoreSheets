var mongoose = require("mongoose");

var gameSchema = new mongoose.Schema({
	name: String,
	image: String,
	fields: { type : Array , "default" : [] }
	// fields: [{
	// 	name: String,
	// 	value: Number,
	// 	title: String,
	// 	type: String,
	// 	icon: String,
	// 	classesDesc: String,
	// 	classesPlayer: String
	// }]
});

module.exports = mongoose.model("Game", gameSchema);