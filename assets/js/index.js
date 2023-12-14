/* jshint esversion: 11 */



const cards = document.querySelectorAll(".memory-card");
const score = document.getElementById("point");
const finalScore = document.getElementById("your-points");
const pop = document.getElementById("pop");
const play = document.getElementById("retry");




var points = 0;
var yourpoints = 0;
var win = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


/* Flip-card function */

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
/* Check-card function If the cards match*/
function checkCards() {
    let isMatch = firstCard.dataset.cards === secondCard.dataset.cards;

    isMatch ? cardsMatch() : cardsDontMatch();
}

function cardsMatch() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    points += 1;
    yourpoints = points;
    win += 2;
    finalScore.innerHTML = yourpoints;
    score.innerHTML = points;

    if (win === 16) {
        pop.style.visibility = "visible";
    }

    resetBoard();
}
/* Cards-dont-match function */
function cardsDontMatch() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
    }, 1000);


    yourpoints = points;
    score.innerHTML = points;
}








/* Reset-board function */
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}
/* Play-Again function */
function playAgain() {
    location.reload();
}

play.addEventListener("click", playAgain);

/* Shuffle-card function */
(function shuffle() {
    cards.forEach((card) => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));
