var allGames		= document.querySelectorAll(".img.index"),
	popupContainer	= $(".popup-container");

// ==================================
// FUNCTIONS

// ==================================
// PAGE STARTUP EXECUTIONS

// ==================================
// EVENTS

// Makes the images on index page links
allGames.forEach(function(game){
	game.addEventListener("click", function(){
		id = $(this)[0].getAttribute("id").substr(1);
		window.location.href = `/games/${id}`;
	})
});

// Shows popup window for deleting game/user
$(".delete-button").on("click", function(){
	// if($(this).attr("object-name")){
	$(".delete-form").attr("action", $(this).attr("object-action"));
	$(".delete-object-name").text($(this).attr("object-name"));
	// }
	popupContainer.css("display", "flex");
});

// Hides popup window
$(".close-popup").on("click", function(){
	popupContainer.hide();
});
