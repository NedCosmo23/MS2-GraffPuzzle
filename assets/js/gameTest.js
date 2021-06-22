// jshint esversion: 6 
// NOTE: added in above comment to prevent JSHint code errors, solution from https://stackoverflow.com/questions/27441803/why-does-jshint-throw-a-warning-if-i-am-using-const 


// --- GENERAL CONSTANTS & VARIABLES FOR MEMORY GAME --- 

// CREDITS: code for memory game functionality from https://marina-ferreira.github.io/tutorials/js/memory-game/ 
// CREDITS: code for additional features not included in above tutorial, like styling, points system, and win modal from: https://www.youtube.com/watch?v=WXv51-Lk438 

const cards = document.querySelectorAll(".memory-card");
const score = document.getElementById("point");
const finalScore = document.getElementById("finalPoints");
const won = document.getElementById("won");
const play = document.getElementById("playAgain");
const body = document.getElementsByTagName("body")[0];

var points = 0;
var finalPoint = 0;
var win = 0;

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// --- SOUND EFFECTS ---

// CREDITS: code for adding sound effects taken from https://www.youtube.com/watch?v=QHBOOouI1tY 

var fxCorrect = new Audio("assets/sounds/nothing_goes_new.mp3"); // sound effect for correct match
var fxWrong = new Audio("assets/sounds/one_of_my_issues_new.mp3"); // sound effect for incorrect match
var fxWon = new Audio("assets/sounds/oh_yeah.mp3"); // sound effect on game completion

// CREDITS: code for toggling class from http://www.developphp.com/video/JavaScript/Change-CSS-Class-Style-className-Toggle-Tutorial 

function toggleClass(el){ // toggles the mute button, if button has class soundoff then sounds muted
	if(el.className == "soundon"){
        el.className = "soundoff";
        fxCorrect.muted = true;
        fxWrong.muted = true;
        fxWon.muted = true; 
	} else {
        el.className = "soundon";
        fxCorrect.muted = false;
        fxWrong.muted = false;
        fxWon.muted = false;
	}
} 

// --- HELP MODAL ---

// CREDITS: code for modal from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal 

var modal = document.getElementById("myModal"); // Get the modal
var btn = document.getElementById("HelpBtn"); // Get the button that opens the modal
var span = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal
btn.onclick = function() {
  modal.style.display = "block"; // When the user clicks the button, open the modal 
};
span.onclick = function() {
  modal.style.display = "none"; // When the user clicks on <span> (x), close the modal
};
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none"; // When the user clicks anywhere outside of the modal, close it
  }
};

// --- GAME SECTION ---

// CREDITS: code for memory game functionality from https://marina-ferreira.github.io/tutorials/js/memory-game/ 
// CREDITS: code for additional features not included in above tutorial, like styling, points system, and win modal from: https://www.youtube.com/watch?v=WXv51-Lk438 

function flipCard() { // flip card function, flips card on click, only applies when board not locked and flipping 1st or 2nd card
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

function checkCards() { // check if cards match function, i.e. if the 2 cards have saem dataset, is a match
  let isMatch = firstCard.dataset.cards === secondCard.dataset.cards;

  isMatch ? cardsMatch() : cardsDontMatch();
}

function cardsMatch() { // function for when cards match, keep them flipped over, add 4 points to points counter, play fxCorrect sound effect     

  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
 
  points += 4; 
  finalPoint = points;  
  win += 2; 
  finalScore.innerHTML = finalPoint;
  score.innerHTML = points;

  if (win != 12) {
    
    fxCorrect.play();     
        
  }  

  // if game is won, play fxWon sound effect, display win modal, reset board
  if (win === 12) {
    
    fxWon.play(); 
    won.style.visibility = "visible";
    
  }

    resetBoard();
  
}

function cardsDontMatch() { // function for when no match, play fxWrong sound effect, lock board, undo card flip, subtract 1 point
  fxWrong.play(); 
  lockBoard = true;

  setTimeout(() => { //
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 2000);

  points -= 1; 
  finalPoint = points;
  score.innerHTML = points;

}

function resetBoard() { // prevent clicking same card twice
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function playAgain() { // to restart game on clicking Play Again button on win modal
  location.reload();
}

play.addEventListener("click", playAgain);

(function shuffle() { // to shuffle cards on restart
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})(); 

cards.forEach((card) => card.addEventListener("click", flipCard));