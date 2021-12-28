//
const setButtons = document.querySelectorAll(".drum");

for (var i = 0; i < setButtons.length; i++) {
	setButtons[i].addEventListener("click", function () {
		switch (this.innerHTML) {
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
				console.log(this.innerHTML);
		}
	});
}
