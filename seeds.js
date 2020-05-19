var mongoose	= require("mongoose"),
	Game		= require("./models/game");

var data = [
	{
		name: "Mystic Vale",
		image: "/media/mystic-vale.jpg"
	},
	{
		name: "Anachrony",
		image: "/media/anachrony.png"
	},
	{
		name: "Quacks of Quedlinburg",
		image: "/media/quacks-of-quedlinburg.jpg"
	},
	{
		name: "Sagrada",
		image: "/media/sagrada.jpg"
	},
	{
		name: "Orleans",
		image: "/media/orleans.png",
		fields: [{
			name: "coins",
			value: 1,
			title: "coins",
			type: "resource",
			icon: "",
			classesDesc: "desc",
			classesPlayer: "player"
		}, {
			name: "wine",
			value: 4,
			title: "wine",
			type: "resource",
			icon: "",
			classesDesc: "desc-wine",
			classesPlayer: "player-wine"
		}]
	},
	{
		name: "Tapestry",
		image: "/media/tapestry.jpg"
	},
	{
		name: "Terraforming Mars",
		image: "/media/terraforming-mars.jpg"
	},
	{
		name: "Quarriors",
		image: "/media/quarriors.jpg"
	},
	{
		name: "Gaia Project",
		image: "/media/gaia-project.jpg"
	},
	{
		name: "Paladins of the West Kingdom",
		image: "/media/paladins-of-the-west-kingdom.png"
	},
	{
		name: "Dice Settlers",
		image: "/media/dice-settlers.jpg"
	},
	{
		name: "Clank! In! Space!",
		image: "/media/clank-in-space.jpg"
	},
	{
		name: "Wingspan",
		image: "/media/wingspan.jpg",
		fields: [{
			name: "birds",
			value: 1,
			title: "birds",
			type: "number",
			icon: "",
			classesDesc: "",
			classesPlayer: "",
			calcMethod: "reg",
			scoreTotal: true
		}, {
			name: "bonusCards",
			value: 1,
			title: "bonus cards",
			type: "number",
			icon: "",
			classesDesc: "",
			classesPlayer: "",
			calcMethod: "reg",
			scoreTotal: true
		}, {
			name: "endOfRoundGoals",
			value: 1,
			title: "end of round goals",
			type: "number",
			icon: "",
			classesDesc: "",
			classesPlayer: "",
			calcMethod: "reg",
			scoreTotal: true
		}, {
			name: "eggs",
			value: 1,
			title: "eggs",
			type: "number",
			icon: "",
			classesDesc: "",
			classesPlayer: "",
			calcMethod: "reg",
			scoreTotal: true
		}, {
			name: "foodOnCards",
			value: 1,
			title: "food on cards",
			type: "number",
			icon: "",
			classesDesc: "",
			classesPlayer: "",
			calcMethod: "reg",
			scoreTotal: true
		}, {
			name: "tuckedCards",
			value: 1,
			title: "tucked cards",
			type: "number",
			icon: "",
			classesDesc: "",
			classesPlayer: "",
			calcMethod: "reg",
			scoreTotal: true
		}]
	},
	{
		name: "7 Wonders Duel",
		image: "/media/7-wonders-duel.jpg"
	},
	{
		name: "Coloma",
		image: "/media/coloma.jpg"
	},
	{
		name: "Everdell",
		image: "/media/everdell.png"
	},
]

function seedDB(){
	console.log("Seeding!");
	Game.remove({}, function(err){
		if(err){
			console.log(`Couldn't remove games during seeding due to ${err}`);
			console.log("=====================================");
		} else {
			console.log("Removed all games!");
			console.log("=====================================");
		}
		data.forEach(function(seed){
			Game.create(seed, function(err, game){
				if(err){
					console.log(`couldn't create ${seed} due to ${err}`);
					console.log("=====================================");
				} else {
					// console.log(`Successfully create game ${game}`);
					// console.log("=====================================");
				}
			});
		});
		console.log("All sed up!");
		console.log("=====================================");
	});
}

module.exports = seedDB;