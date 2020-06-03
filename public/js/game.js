var test = "TinyLittleThingCalledLuna"
var gamesContainer	= $(".games-container");
	
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
function scoreCalculator(element){
	var column = $(this).parent().parent();
	var totalHtml = column.children(".total").last();
	var totalScore = 0;
	var regScoreTotal = column.children(".scoreTotal.reg");
	var setsScoreTotal = column.children(".scoreTotal.sets");
	
	regScoreTotal.each(function(){
		totalScore += ($(this).val() * $(this).children().val());
	});
	
	setsScoreTotal.each(function(){
		totalScore += ($(this).val() * Math.floor($(this).children().val() / $(this).attr("setsValue")));
	});
	
	totalHtml.text(totalScore);
}

// Clear score
function clearScore(){
	$(".scoreParameter").children().val("");
	$(".total").text("");
}

// ==================================
// PAGE STARTUP EXECUTIONS

addPlayer();

// ==================================
// EVENTS

// Adding new player
// pure JS
// document.querySelector(".addPlayer").addEventListener("click", addPlayer);
$(".addPlayer").on("click", addPlayer);

// Changing from sets calcMethod

// Clear score
$(".clearScore").on("click", clearScore);

// Delete player
gamesContainer.on("click", ".deletePlayer", function(){
	$(this).parent().parent().remove();
});

// Calculate score on input change
gamesContainer.on("change", ".scoreParameter>input", scoreCalculator);


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