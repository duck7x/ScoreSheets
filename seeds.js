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
		image: "/media/orleans.png"
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
		image: "/media/wingspan.jpg"
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
					console.log(`couldn't create ${seeed} due to ${err}`);
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