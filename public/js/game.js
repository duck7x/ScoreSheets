var test = "TinyLittleThingCalledLuna"
// objects
var gamesContainer				= $(".games-container"),
	popupContainer				= $(".popup-container"),
	popupText					= $(".popup-content>h1"),
	popupDeleteButtons			= $(".delete-popup-buttons"),
	popupNotificationButtons	= $(".notification-popup-buttons"),
	autoCalcStatus				= $(".autoCalc-status"),
	calcButton					= $(".calculate.btn"),
	autoCalcButton				= $(".autoCalc.btn");
// values
var minPlayers		= Number($("#minPlayers").html()),
	maxPlayers		= Number($("#maxPlayers").html()),
	winCondition	= $("#winCondition").html(),
	tieBreaker		= $("#tieBreaker").html(),
	autoCalc		= true,
	targetsRanges	= {};

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

function reachTargetCalculation(target, reached){
	let score = 0;
	targetsRanges[target].every(function(range){
		let splitRange = range.split(":");
		if(reached >= Number(splitRange[0])){
			score = Number(splitRange[1]);
			return false;
		}
		return true;
	});
	return score;
}

// Calculating the score of a specific player (element is the table of a player)
function scoreCalculator(element, calcField){
	var column 											= calcField ? calcField.parent().parent() : $(this).parent().parent(),
		totalScore 										= 0,
		totalHtml 										= column.children(".total").last(),
		regScoreTotal 									= column.children(".scoreTotal.reg"),
		setsScoreTotal 									= column.children(".scoreTotal.sets"),
		squareScoreTotal 								= column.children(".scoreTotal.square"),
		rankingScoreTotal 								= column.children(".scoreTotal.ranking"),
		uniqueSetsScoreTotal							= column.children(".scoreTotal.unique-sets"),
		singleCheckboxScoreTotal						= column.children(".scoreTotal.single-checkbox"),
		multipleFieldsScoreTotal						= column.children(".multiple-fields"),
		multiplyFieldsScoreTotal						= column.children(".scoreTotal.multiply"),
		reachTargetsSelfScoreTotal						= column.children(".scoreTotal.reach-target.self"),
		reachTargetsOtherFieldScoreTotal				= column.children(".scoreTotal.reach-target.other-field"),
		reachTargetsDynamicLocalOtherFieldScoreTotal	= column.children(".scoreTotal.reach-target.dynamic-other-field.local"),
		reachTargetsDynamicGlobalOtherFieldScoreTotal	= column.children(".scoreTotal.reach-target.dynamic-other-field.global");
		// multipleFieldsScoreTotal	= column.children(".scoreTotal.multiple-fields");
	
	multipleFieldsScoreTotal.each(function(){
		let relFields	= $(this).children().attr("relevant-fields").split(" "),
			currField	= $(this),
			currSum		= 0;
		if($(this).hasClass("multiply")){
			currSum = 1;
			relFields.forEach(function(field){
				currSum *= Number(currField.siblings(`[name=${field}]`).children().val());
			})
		} else {
			relFields.forEach(function(field){
				currSum += Number(currField.siblings(`[name=${field}]`).children().val());
			});
		}
		$(this).children().val(currSum);
	});
	
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
	
	multiplyFieldsScoreTotal.each(function(){
		totalScore += Number($(this).children().val());
	});
	
	reachTargetsSelfScoreTotal.each(function(){
		let reached = Number($(this).children().val()),
			target	= $(this).children().attr("targetsrange");
		totalScore += reachTargetCalculation(target, reached);
		// // targetsRanges[target].forEach(function(range){
		// targetsRanges[target].every(function(range){
		// 	let splitRange = range.split(":");
		// 	if(reached >= Number(splitRange[0])){
		// 		totalScore += Number(splitRange[1]);
		// 		return false;
		// 	}
		// 	return true;
		// });
	});
	
	reachTargetsOtherFieldScoreTotal.each(function(){
		let currValue,
			reached,
			target		= $(this).children().attr("targetsrange"),
			otherField	= $(this).children().attr("otherfield");
		
		reached = $(this).siblings(`[name=${otherField}]`).children().val();
		currValue = reachTargetCalculation(target, reached);
		totalScore += currValue;
		if(currValue){
			$(this).children().val(currValue);
		}
	});
	
	// need to add (after adding select option)
	reachTargetsDynamicLocalOtherFieldScoreTotal.each(function(){
		
	});
	
	reachTargetsDynamicGlobalOtherFieldScoreTotal.each(function(){
		let currValue,
			reached,
			target			= $(this).children().attr("targetsrange"),
			dynamicField	= $(this).children().attr("otherField"),
			calcByField;
		
		calcByField = $(`.aboveTable.field-cell[name="${dynamicField}"]`).children("select,input").val();
		reached = $(this).siblings(`[name="${calcByField}"]`).children().val();
		currValue = reachTargetCalculation(target, reached);
		totalScore += currValue;
		if(currValue){
			$(this).children().val(currValue);
		}
	});
	
	uniqueSetsScoreTotal.each(function(){
		let values		= [],
			cellScore,
			fields 		= $(this).children().attr("uniquesetsfields").split(" "),
			setsValue	= $(this).children().attr("uniquesetsvalue"),
			thisField	= $(this);
		
		fields.forEach(function(field){
			values.push(Number(thisField.siblings(`[name="${field}"]`).children().val()));
		});
		values.sort()
		setsValue = splitIntoDict(setsValue);
		
		
		if(values.length === setsValue.length){
			cellScore = uniqueSetsValueCalculator(values, setsValue);
			totalScore += cellScore;
			$(this).children().val(cellScore);
		}
	});
	
	rankingScoreTotal.each(function(){
		totalScore += $(this).val();
	});
	
	totalHtml.text(totalScore);
	checkWinner();
}

// Marks a player as winner
function winner(player){
	player.find(".winner-crown").addClass("winner");
}

// Makes sure a player is not marked as winner
function unwinner(player){
	player.find(".winner-crown").removeClass("winner");
}

// Checks who's the current winner(s) and shows it
function checkWinner(){
	let players	= $(".player.table").slice(1),
		totals	= $(".total").slice(1),
		scores	= [],
		maxScore;
	totals.each(function(){
		scores.push(Number($(this).html()));
	});
	maxScore = Math.max(...scores);
	
	players.each(function(){
		let score = Number($(this).find(".total").html());
		if (score === maxScore){
			winner($(this));
		} else {
			unwinner($(this));
		}
	});
}

function RankingCalculator(rankingCell){
	let playersSum		= [],
		sortedSum		= [],
		currIndex		= [],
		count			= 1,
		currValue,
		currHighest,
		values			= rankingCell.children().attr("rankingvalues").split(" "),
		fields			= rankingCell.children().attr("rankingFields").split(" "),
		tieMethod		= rankingCell.children().attr("rankingtiemethod"),
		rankingName		= rankingCell.attr("name"),
		playersTables	= $(".player.table:not(:first)"),
		playersNum		= playersTables.length;

	playersTables.each(function(){
		$($(this)).children().children(`[name=${rankingName}]`).children().val(0);
		playersSum.push(calcSum($(this), fields));
	});
	
	sortedSum = sortLargeToSmall(playersSum);
	values = eliminateMinimumByRequirement(values, playersNum);
	currHighest = sortedSum[0];	
	
	while(values.length && currHighest > 0){
		currIndex.push(playersSum.indexOf(currHighest));
		while(playersSum.indexOf(currHighest, currIndex[currIndex.length - 1] + 1) >= 0){
			count ++;
			currIndex.push(playersSum.indexOf(currHighest, currIndex[currIndex.length - 1] + 1));
		}
		
		sortedSum.splice(0, count);

		if(tieMethod === "friendly"){
			currValue = values[0];
			values.shift();
		} else {
			if(values.length > count){
				currValue = values.splice(0, count).reduce((a,b) => Number(a) + Number(b));
			} else {
				currValue = values.reduce((a,b) => Number(a) + Number(b));
				values = [];
			}
			if(tieMethod === "split-rounded-down"){
				currValue = Math.floor(currValue / count);
			} else {
				currValue = Math.ceil(currValue / count);
			}
		}

		currIndex.forEach(function(i){
			$(playersTables[i]).children().children(`[name=${rankingName}]`).children().val(currValue);
		});
		
		currIndex = [];
		currHighest = sortedSum[0];
		count = 1;
	}

}

async function calculateAllRankings(){
	let rankingCells 	= $(".player.table").last().children().children(".ranking");
	rankingCells.each(function(){
		RankingCalculator($(this));
	});
}

async function scoreCalculatorAll(){
	let players = $(".player.table").slice(1);
	await calculateAllRankings();
	players.each(function(){
		scoreCalculator($(this), $(this).children().children().children());
	});
}

// Clear score
function clearScore(){
	$(".scoreParameter").children().val("");
	$(".scoreParameter").children("[type=checkbox]").prop("checked", false);
	$(".total").text("");
	$(".winner-crown").removeClass("winner");
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

// general-checkbox addClass type functionality
function generalCheckboxAddClass(check, add, remove, fields){
	if(check === "unchecked"){
		[add, remove] = [remove, add];
	}
	fields.forEach(function(field){
		let selectedField = $(`li[name='${field}'],li#${field}`);
		selectedField.addClass(add);
		selectedField.removeClass(remove);
	})
	
	scoreCalculatorAll();
}

// Enables a button
function enableButton(button){
	button.addClass("clickable");
	button.removeClass("disabled")
}

// Disables a button
function disableButton(button){
	button.addClass("disabled");
	button.removeClass("clickable")
}

// Toggle a button
function toggleButton(button){
	button.toggleClass("clickable disabled");
}

// hides results and winner(s)
function hideResults(){
	$(".total").addClass("invisible");
	$(".winner-crown").addClass("invisible");
}

// makes results and winner(s) visible
function showResults(){
	$(".total").removeClass("invisible");
	$(".winner-crown").removeClass("invisible");
}

// toggles autoCalc
// should toggle between ON and OFF
// if switches to ON - should disable (and change text of) calc button and make results visible
// if switchs to OFF - should enable calc button and hide results (and winners)
function toggleAutoCalc(){
	autoCalcButton.toggleClass("clicked");
	if (autoCalc){
		hideResults();
	} else {
		calcButton.html("Calculate");
		showResults();
	}
	toggleButton(calcButton);
	autoCalc = !autoCalc;
	autoCalcStatus.toggleClass("red green");
}

// toggles calculate button
// should hide/show results (and winners) and change button text
function toggleCalculate(){
	if(calcButton.html() === "Calculate"){
		calcButton.html("Hide Scores");
		showResults();
	} else if(calcButton.html() === "Hide Scores"){
		calcButton.html("Calculate");
		hideResults();
	}
}

function sortLargeToSmall(array){
	let tempArray = [...array];
	return tempArray.sort(function(a, b){return b - a});
}

function eliminateMinimumByRequirement(array, amount){
	array.forEach(function(val, i){
		if(val.includes("?") && Number(val.split("?")[0]) > amount){
			array.splice(i, 1);
		} else {
			array[i] = val.includes("?") ? val.split("?")[1] : val;
		}
	});
	return array;
}

// splits a string into a key-value dict
function splitIntoDict(string){
	let firstSplit	= string.split(" "),
		finalSplit	= {};
	
	firstSplit = firstSplit.sort(function(a, b){return b.split(":")[0] - a.split(":")[0]});
	// firstSplit.forEach(function(currentString){
	// 	let secondSplit = currentString.split(":");
	// 	finalSplit[secondSplit[0]] = secondSplit[1];
	// });
	
	// return finalSplit;
	return firstSplit;
}

// Collects all reach-target cells and makes a dictionary of the ranges
function setReachTargetDict(){
	$(".field-cell.reach-target").each(function(){
		let currTargetsRange = $(this).attr("targetsRange");
		targetsRanges[currTargetsRange] = targetsRanges[currTargetsRange] ? targetsRanges[currTargetsRange] : splitIntoDict(currTargetsRange);
	});
}

// Calculates sets and their value if amount of values is equal to amount of sets values
function uniqueSetsValueCalculator(values, setsValues){
	let currSet, currValue,
		sum		= 0,
		used	= 0;
	while(values.length){
		currSet = Number(setsValues[0].split(":")[0]);
		currValue = Number(setsValues[0].split(":")[1]);
		if(values.length === currSet && values[0] > used){
			sum += (values[0] - used) * currValue;
			used += (values[0] - used);
		}
		values.shift();
		setsValues.shift();
	}
	return sum;
}

function calcSum(column, fields){
	let sum = 0;
	fields.forEach(function(field){
		sum += Number(column.children().children(`[name=${field}]`).children().val());
	});
	return sum;
}

// ==================================
// PAGE STARTUP EXECUTIONS

// adds the minimum amount of required players
for(i = 0; i < minPlayers; i++){
	addPlayer();
}

// creates inital dict of reach-targets for calculation usage
setReachTargetDict();

// ==================================
// EVENTS

// Adding new player
// pure JS
// document.querySelector(".addPlayer").addEventListener("click", addPlayer);
$(".addPlayer").on("click", function(){
	if($(".player.table").length - 1 < maxPlayers){
		addPlayer();
		scoreCalculatorAll();
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
		scoreCalculatorAll();
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

// Calculate score on input/select change
// gamesContainer.on("change", ".scoreParameter>input,.scoreParameter>select", scoreCalculator);
gamesContainer.on("change", ".scoreParameter>input,.scoreParameter>select", scoreCalculatorAll);

// Calculates all score on global fields select changes
gamesContainer.on("change", ".scoreParameter.aboveTable.field-cell>select", scoreCalculatorAll);

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

// Triggers general-checkbox effects with add-class functionality
gamesContainer.on("change", ".general-checkbox.add-class>input", function(){
	let check	= $(this).prop("checked") ? "checked" : "unchecked",
		add		= $(this).nextAll(".add-class").text(),
		remove	= $(this).nextAll(".remove-class").text(), 
		fields	= $(this).nextAll(".add-fields").text().split(" ");
	
	generalCheckboxAddClass(check, add, remove, fields);
});

// Enable/disables auto-calc (if needed)
gamesContainer.on("click", ".autoCalc", toggleAutoCalc);

// calc/hides score (if needed)
gamesContainer.on("click", ".calculate.clickable", toggleCalculate);

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