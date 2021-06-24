

const cards = document.querySelectorAll('.memory-card');

let hasFlipped = false;
let lockBoard = false;
let first, second;

// Flips card that is clicked on
function flip() {
    if (lockBoard) return;
    if (this === first) return;
    this.classList.add('flip');

    if (!hasFlipped) {
        hasFlipped = true;
        first = this;
        return;
    }

// Checks if first and second card are a match
    second = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = first.dataset.framework === second.dataset.framework;
    isMatch ? disableCards() : unflip();
}

// Stops more than 2 cards being flipped at a time
function disableCards() {
    first.removeEventListener('click', flip);
    second.removeEventListener('click', flip);
    resetBoard();
}


function unflip() {
    lockBoard = true;

// Flips cards back over if the 2 are not a match
    setTimeout(() => {
        first.classList.remove('flip');
        second.classList.remove('flip');
        resetBoard();
    }, 1500);

}

function resetBoard() {
    [hasFlipped, lockBoard] = [false, false];
    [first, second] = [null, null];
}

//Shuffles the deck
(function shuffle() {

    cards.forEach(card => {

        let ramdomPos = Math.floor(Math.random() * 12);

        card.style.order = ramdomPos;

    });

})();

function winGame(){
    
}




cards.forEach(card => card.addEventListener('click', flip));