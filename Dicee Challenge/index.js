// Generate a random number between 1 and max
function getRandomNumber(max = 6) {
	return Math.ceil(Math.random() * max);
}

const flag = "🚩";
const winnerTitle = document.querySelector("h1");

var randomNumber1 = getRandomNumber();
var randomNumber2 = getRandomNumber();

document
	.querySelector(".img1")
	.setAttribute("src", `images/dice${randomNumber1}.png`);
document
	.querySelector(".img2")
	.setAttribute("src", `images/dice${randomNumber2}.png`);

function updateWinner() {
	if (randomNumber1 === randomNumber2) {
		winnerTitle.innerHTML = "Draw";
	} else {
		winnerTitle.innerHTML = `${
			randomNumber1 > randomNumber2
				? `${flag} Player 1 Wins!`
				: `Player 2 Wins! ${flag}`
		}`;
	}
}

updateWinner();
