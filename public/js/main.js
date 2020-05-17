var allGames = document.querySelectorAll(".img.index")

allGames.forEach(function(game){
	game.addEventListener("click", function(){
		id = $(this)[0].getAttribute("id").substr(1);
		window.location.href = `/games/${id}`;
	})
});
