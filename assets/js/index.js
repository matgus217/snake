/* jshint esversion: 11 */



const cards = document.querySelectorAll(".memory-card");
const score = document.getElementById("point");
const finalScore = document.getElementById("your-points");
const pop = document.getElementById("pop");
const play = document.getElementById("retry");
const button = document.getElementsByClassName("button3");
const body = document.getElementsByTagName("body")[0];

var points = 0;
var finalPoint = 0;
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
    let isMatch = firstCard.dataset.cards === secondCard.dataset.cards;

    isMatch ? cardsMatch() : cardsDontMatch();
}

function cardsMatch() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    points += 1;
    finalPoint = points;
    win += 2;
    finalScore.innerHTML = finalPoint;
    score.innerHTML = points;

    if (win === 16) {
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


    finalPoint = points;
    score.innerHTML = points;
}




function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function playAgain() {
    location.reload();
}

play.addEventListener("click", playAgain);

(function shuffle() {
    cards.forEach((card) => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));
