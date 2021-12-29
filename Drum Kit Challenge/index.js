// Handle sound playing events

function makeSound(key) {
	switch (key) {
		case "w":
			new Audio("sounds/tom-1.mp3").play();
			break;

		case "a":
			new Audio("sounds/tom-2.mp3").play();
			break;

		case "s":
			new Audio("sounds/tom-3.mp3").play();
			break;

		case "d":
			new Audio("sounds/tom-4.mp3").play();
			break;

		case "j":
			new Audio("sounds/snare.mp3").play();
			break;

		case "k":
			new Audio("sounds/crash.mp3").play();
			break;

		case "l":
			new Audio("sounds/kick-bass.mp3").play();
			break;

		default:
			console.log(key);
	}
}

// Button Animation Functions
function buttonAnimationOn(currentKey) {
	document.querySelector(`.${currentKey}`)?.classList.add("pressed");
}

function buttonAnimationOff(currentKey) {
	document.querySelector(`.${currentKey}`)?.classList.remove("pressed");
}

function buttonAnimationTimer(currentKey, time = 100) {
	buttonAnimationOn(currentKey);
	setTimeout(buttonAnimationOff, time, currentKey);
}

// Detect Button Press
const setButtons = document.querySelectorAll(".drum");

for (var i = 0; i < setButtons.length; i++) {
	setButtons[i].addEventListener("click", function () {
		makeSound(this.innerHTML);
		buttonAnimationTimer(this.innerHTML);
	});
}

// Detect Keyboard Down/Up
document.addEventListener("keydown", function (event) {
	makeSound(event.key);
	buttonAnimationOn(event.key);
});

document.addEventListener("keyup", function (event) {
	buttonAnimationOff(event.key);
});
