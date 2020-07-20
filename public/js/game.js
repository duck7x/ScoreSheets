var test = "TinyLittleThingCalledLuna"
var gamesContainer				= $(".games-container"),
	popupContainer				= $(".popup-container"),
	popupText					= $(".popup-content>h1"),
	popupDeleteButtons			= $(".delete-popup-buttons"),
	popupNotificationButtons	= $(".notification-popup-buttons");
var minPlayers	= Number($("#minPlayers").html()),
	maxPlayers	= Number($("#maxPlayers").html());

minPlayers = minPlayers <= 0 ? 1 : minPlayers;
maxPlayers = maxPlayers < minPlayers ? minPlayers : maxPlayers;
	
// ==================================
// FUNCTIONS

// Adding new player to the page when clicking on the plus-person icon
function addPlayer(){
	// pure JS 
	// var newPlayer = document.getElementById("template").firstElementChild;
	// document.querySelector(".games-container").appendChild(newPlayer);
	// JQUERY
	var newPlayer = gamesContainer.append($("#template").html());
}

// Calculating the score of a specific player (element is the table of a player)
function scoreCalculator(element, calcField){
	var column 						= calcField ? calcField.parent().parent() : $(this).parent().parent(),
		totalScore 					= 0,
		totalHtml 					= column.children(".total").last(),
		regScoreTotal 				= column.children(".scoreTotal.reg"),
		setsScoreTotal 				= column.children(".scoreTotal.sets"),
		squareScoreTotal 			= column.children(".scoreTotal.square"),
		singleCheckboxScoreTotal	= column.children(".scoreTotal.single-checkbox");
	
	regScoreTotal.each(function(){
		totalScore += ($(this).val() * $(this).children().val());
	});
	
	setsScoreTotal.each(function(){
		totalScore += ($(this).val() * Math.floor($(this).children().val() / $(this).attr("setsValue")));
	});
	
	squareScoreTotal.each(function(){
		totalScore += ($(this).children().val() * $(this).children().val());
	});
	
	singleCheckboxScoreTotal.each(function(){
		totalScore += $(this).children().prop("checked") ? $(this).val() : 0;
	});
	
	totalHtml.text(totalScore);
}

// 

// Clear score
function clearScore(){
	$(".scoreParameter").children().val("");
	$(".scoreParameter").children("[type=checkbox]").prop("checked", false);
	$(".total").text("");
}

// Edits popup window
function popupWindowEdit(text){
	if(!popupDeleteButtons.hasClass("hidden")){
		popupDeleteButtons.addClass("hidden");
	}
	popupNotificationButtons.removeClass("hidden");
	popupText.text(text);
	// $(".delete-form").attr("action", $(this).attr("object-action"));
	// $(".delete-object-name").text($(this).attr("object-name"));
	// }
	
};

// Shows popup window
function popupWindowDisplay(){
	popupContainer.css("display", "flex");
}

// ==================================
// PAGE STARTUP EXECUTIONS

for(i = 0; i < minPlayers; i++){
	addPlayer();
}

// ==================================
// EVENTS

// Adding new player
// pure JS
// document.querySelector(".addPlayer").addEventListener("click", addPlayer);
$(".addPlayer").on("click", function(){
	if($(".player.table").length - 1 < maxPlayers){
		addPlayer();
	} else {
		popupWindowDisplay();
		popupWindowEdit(`This game cannot be played with more than ${maxPlayers} players`);
	}
});

// Changing from sets calcMethod

// Clear score
$(".clearScore").on("click", clearScore);

// Delete player
gamesContainer.on("click", ".deletePlayer", function(){
	if($(".player.table").length - 1 > minPlayers){
		$(this).parent().parent().remove();
	} else {
		popupWindowDisplay();
		popupWindowEdit(`This game requires at least ${minPlayers} players`);
	}
});

// Unchecks everything else when a single-checkbox is checked
gamesContainer.on("change", ".single-checkbox>input", function(){
	if($(this).prop("checked")){
		let name = $(this).parent().attr("name");
		$(`[name=${name}]`).each(function(){
			$(this).children().prop("checked", false);
			scoreCalculator($(this), $(this).children());
			// $(".scoreTotal.single-checkbox").last().children().prop("checked", false)
			// console.log($(this).children());
		});
		$(this).prop("checked", true);
		// console.log($(this));
	}
	// console.log($(this).children());
});

// Calculate score on input change
gamesContainer.on("change", ".scoreParameter>input", scoreCalculator);

// Displays explanation when hovering a field
gamesContainer.on("mouseenter", ".field-cell", function(){
	let name = $(this).attr("id");
	$(`.explanation[name="${name}"]`).css("display", "flex");
});

// Removes explanation when unhovering a field
gamesContainer.on("mouseleave", ".field-cell", function(){
	let name = $(this).attr("id");
	$(`.explanation[name="${name}"]`).css("display", "none");
});


// ==================================
// NOTES FOR ME, WILL BE DELETED

// var this_js_script = $('script[src*=somefile]'); // or better regexp to get the file name..

// var my_var_1 = this_js_script.attr('data-my_var_1');   
// if (typeof my_var_1 === "undefined" ) {
//    var my_var_1 = 'some_default_value';
// }
// alert(my_var_1); // to view the variable value

// var my_var_2 = this_js_script.attr('data-my_var_2');   
// if (typeof my_var_2 === "undefined" ) {
//    var my_var_2 = 'some_default_value';
// }
// alert(my_var_2); // to view the variable value