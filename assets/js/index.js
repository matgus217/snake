/* jshint esversion: 11 */



const card = document.querySelectorAll(".memory-game");
const score = document.getElementById("point");
const finalScore = document.getElementById("your-points");
const pop = document.getElementById("pop");
const play = document.getElementById("retry");
const button = document.getElementsByClassName("button3");
const body = document.getElementsByTagName("body")[0];

var points = 0;
var yourpoints = 0;
var win = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flip");

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    secondCard = this;
    checkCards();
}

function checkCards() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;

    isMatch ? cardsMatch() : cardsDontMatch();
}

function cardsMatch() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    points += 4;
    yourpoints = points;
    win += 2;
    finalScore.innerHTML = yourpoints;
    score.innerHTML = points;

    if (win === 12) {
        pop.style.visibility = "visible";
    }

    resetBoard();
}

function cardsDontMatch() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
    }, 1000);

    points -= 1;
    yourpoints = points;
    score.innerHTML = points;
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function retry() {
    location.reload();
}

play.addEventListener("click", retry);

(function shuffle() {
    card.forEach((card) => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})(); //IIFE

card.forEach((card) => card.addEventListener("click", flipCard));
