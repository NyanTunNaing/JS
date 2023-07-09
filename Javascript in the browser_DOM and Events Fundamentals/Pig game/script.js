"use strict";

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const currentScore0El = document.querySelector("#current--0");
const currentScore1El = document.querySelector("#current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

/*
// Own solution

let currentScore0 = 0;
let currentScore1 = 0;
let totalScore0 = 0;
let totalScore1 = 0;
let playing = true;

btnRoll.addEventListener("click", function () {
  if (playing) {
    let random = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `./dice-${random}.png`;

    if (random !== 1) {
      if (player0.classList.contains("player--active")) {
        currentScore0 += random;
        currentScore0El.textContent = currentScore0;
      } else {
        currentScore1 += random;
        currentScore1El.textContent = currentScore1;
      }
    } else {
      if (player0.classList.contains("player--active")) {
        currentScore0 = 0;
        currentScore0El.textContent = 0;
        player0.classList.remove("player--active");
        player1.classList.add("player--active");
      } else {
        currentScore1 = 0;
        currentScore1El.textContent = 0;
        player0.classList.add("player--active");
        player1.classList.remove("player--active");
      }
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    if (player0.classList.contains("player--active")) {
      totalScore0 += currentScore0;
      score0El.textContent = totalScore0;
      currentScore0 = 0;
      currentScore0El.textContent = 0;
      player0.classList.remove("player--active");
      player1.classList.add("player--active");

      if (totalScore0 > 100) {
        playing = false;
        player0.classList.add("player--winner");
        player0.classList.remove("player--active");
        diceEl.classList.add("hidden");
      }
    } else {
      totalScore1 += currentScore1;
      score1El.textContent = totalScore1;
      currentScore1 = 0;
      currentScore1El.textContent = 0;
      player0.classList.add("player--active");
      player1.classList.remove("player--active");

      if (totalScore1 > 100) {
        playing = false;
        player1.classList.add("player--winner");
        player1.classList.remove("player--active");
        diceEl.classList.add("hidden");
      }
    }
  }
});

btnNew.addEventListener("click", function () {
  diceEl.classList.add("hidden");
  currentScore0 = 0;
  currentScore1 = 0;
  totalScore0 = 0;
  totalScore1 = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
  playing = true;
});
*/

// Lecture solution

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  // we need to reset the current score before switching player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove("hidden");
    diceEl.src = `./dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] > 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", function () {
  diceEl.classList.add("hidden");
  currentScore = 0;
  scores = [0, 0];
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
  playing = true;
});
