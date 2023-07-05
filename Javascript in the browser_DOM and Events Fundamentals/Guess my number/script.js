"use strict";

/*
document.querySelector(".number").textContent = 12;
document.querySelector(".score").textContent = 14;
document.querySelector(".message").textContent = "Correct Number";
document.querySelector(".guess").value = 23;
*/

let secretNum = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);

  if (!guess) {
    document.querySelector(".message").textContent = "No number!.";

    // when guess is right
  } else if (guess === secretNum) {
    document.querySelector(".message").textContent = "Correct Number!";
    document.querySelector("body").style.backgroundColor = "lime"; // when we set the style in js file, we always need to write the value as a string.

    if (highScore < score) {
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
    }

    document.querySelector(".score").textContent = 20;

    // when guess is wrong
  } else if (guess !== secretNum) {
    if (score > 1) {
      document.querySelector(".message").textContent =
        guess > secretNum ? "Too high!" : "Too low!";
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      document.querySelector(".message").textContent = "You lose the game!";
      document.querySelector(".score").textContent = 0;
    }
  }

  // else if (guess > secretNum) {
  //   if (score > 1) {
  //     document.querySelector(".message").textContent = "Too high!";
  //     score--;
  //     document.querySelector(".score").textContent = score;
  //   } else {
  //     document.querySelector(".message").textContent = "You lose the game!";
  //     document.querySelector(".score").textContent = 0;
  //   }
  // } else if (guess < secretNum) {
  //   if (score > 1) {
  //     document.querySelector(".message").textContent = "Too low!";
  //     score--;
  //     document.querySelector(".score").textContent = score;
  //   } else {
  //     document.querySelector(".message").textContent = "You lose the game!";
  //     document.querySelector(".score").textContent = score;
  //   }
  // }
});

document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  secretNum = Math.trunc(Math.random() * 20) + 1;
  document.querySelector(".message").textContent = "Start guessing...";
  document.querySelector(".score").textContent = score;
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
  document.querySelector("body").style.backgroundColor = "#222";
});
