const buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];
let level = 0;

function getRandomNumber(max = 4) {
	return Math.floor(Math.random() * max);
}

function checkAnswer(currentLevel) {
	console.log(
		userClickedPattern[currentLevel - 1],
		gamePattern[currentLevel - 1]
	);
	console.log(currentLevel);
	if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
		return true;
	}

	return false;
}

function playSound(color) {
	new Audio(`sounds/${color}.mp3`).play();
}

function animatePress(color) {
	$(`#${color}`).addClass("pressed");

	setTimeout(function () {
		$(`#${color}`).removeClass("pressed");
	}, 100);
}

function nextSequence() {
	level++;
	userClickedPattern = [];
	$("h1").text(`Level ${level}`);

	const nextColor = buttonColors[getRandomNumber()];
	gamePattern.push(nextColor);

	playSound(nextColor);
	$(`#${nextColor}`).fadeOut().fadeIn();
}

function startOver() {
	level = 0;
	gamePattern = [];
}

$(".btn").click(function (e) {
	e.preventDefault();

	const userChosenColor = this.id;
	userClickedPattern.push(userChosenColor);

	playSound(userChosenColor);
	animatePress(userChosenColor);

	if (checkAnswer(userClickedPattern.length - 1)) {
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(nextSequence, 1000);
		}
	} else {
		new Audio("sounds/wrong.mp3").play();
		$("body").addClass("game-over");
		$("h1").text("Game Over, Press Any Key to Restart");
		setTimeout(function () {
			$("body").removeClass("game-over");
		}, 200);

		startOver();
	}

	console.log(userClickedPattern, gamePattern);
});

$(document).keypress(function (e) {
	if (level !== 0) {
		return;
	}

	$("h1").text(`Level ${level}`);
	nextSequence();
});
