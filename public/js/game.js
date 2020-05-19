var test = "TinyLittleThingCalledLuna"

// ==================================
// FUNCTIONS

// Adding new player to the page when clicking on the plus-person icon
function addPlayer(){
	// pure JS 
	// var newPlayer = document.getElementById("template").firstElementChild;
	// document.querySelector(".games-container").appendChild(newPlayer);
	// JQUERY
	var newPlayer = $(".games-container").append($("#template").html());
}

// Calculating the score of a specific player (element is the table of a player)
function scoreCalculator(element){
	
}

// ==================================
// PAGE STARTUP EXECUTIONS

addPlayer();

// ==================================
// EVENTS

// Adding new player
document.querySelector(".addPlayer").addEventListener("click", addPlayer);

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