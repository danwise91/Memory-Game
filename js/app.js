/*
 * Create a list that holds all of your cards
 */
let card_names = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"],
    open_cards = [],
    shown_cards = [],
    move_count = 0,
    matched_pairs = 0,
    game_started = false;

const deck = document.getElementById('mainDeck');
const reset_button = document.querySelector('.restart');
const play_again = document.querySelector('.play-again');
const moves = document.querySelector('.moves');
const starOne = document.getElementById('star-one');
const starTwo = document.getElementById('star-two');
const starThree = document.getElementById('star-three');
const starLine = document.getElementById('stars');

reset_button.addEventListener('click', playGame);

// play_again.addEventListener('click', playGame);

playGame();

//display score
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function createDeck() {
    // clears deck to start before redrawing.
    // Remove ChildrenNodes - StackOverflow --> https://bit.ly/2Hmw67R
    while(deck.hasChildNodes() ){
        deck.removeChild(deck.lastChild);
    }

    // Loops through the card_names array and recreates the card elements on the page.
    for (let i = 0; i < card_names.length; i++) {
        const newCard = document.createElement('li');
        newCard.className = "card";
        const newCardData = document.createElement('i');
        newCardData.className = card_names[i];

        const addNewCardData = newCard.appendChild(newCardData);
        const addNewCard = deck.appendChild(newCard);
    }
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


function flipOver() {
  event.target.classList.add('open');
  event.target.classList.add('show');
}

// adds click eventListener to <ul> rather than each individual card.
 // * set up the event listener for a card. If a card is clicked:
deck.addEventListener('click', function(event) {
 // *  - display the card's symbol (put this functionality in another function that you call from this one)
    flipOver();
 // *  + increment the move counter and display it on the page (put this functionality in another function that you call from this one)   
    increaseMoveCount();
    // stops user from just clicking on 1 card twice to "match" it.
    // if (event.target.classList.contains('open')) { 
    //     return; 
    // }
  if (open_cards.length != 2 && event.target.className === "card open show" && 
        shown_cards.length != 2){
        open_cards.push(event.target.childNodes[0].className);
        shown_cards.push(event.target);
        console.log(open_cards);
        console.log(shown_cards);
    }

 // *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
    // addToOpenArray();
 // *  - if the list already has another card, check to see if the two cards match
  // *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
    if (open_cards.length > 1) {
        if(open_cards[0] === open_cards[1] ) {
                setTimeout(function(){
                shown_cards[0].classList.add('match');
                shown_cards[1].classList.add('match');
                matched_pairs += 1;
                open_cards = [];
                shown_cards = [];
            }, 110);
// *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
        } else if (open_cards[0] != open_cards[1]) {
            setTimeout(function(){
            shown_cards[0].classList.remove('open');
            shown_cards[0].classList.remove('show');
            shown_cards[1].classList.remove('open');
            shown_cards[1].classList.remove('show');
            open_cards = [];
            shown_cards = [];
            }, 500);
        }
    }
 // *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
    if(matched_pairs === 8) {
        showModal();
      }
 });

// increases move count: 2 clicks === 1 move
function increaseMoveCount() {
    move_count += 1;
    moves.innerHTML = move_count;

    if (move_count === 6) {
          starOne.remove();
    } else if (move_count === 12) {
          starTwo.remove();
    } else if (move_count === 15) {
          starThree.remove(); 
    }
}

 
// Winning Modal
function showModal() {
    let modal = document.getElementById('win-modal');
    modal.style.display = "block";
};


function playGame() {
    //matched pairs doesnt update as the score
    document.getElementById("show-score").innerHTML = "Score: " + matched_pairs;
    //set the timer
    var minutes = 60 * 1,
    display = document.getElementById('timer');
    startTimer(minutes, display);
    // startGameClock();
    createDeck();
    // shuffles the order of the cards to begin.
    shuffle(card_names);
    //Resets the move counter and displayed number of moves.
    move_count = 0;
    moves.innerHTML = 0;
    //**needs to reset stars and time**
}

//timer code
function startTimer(duration, display) {
    //set the duration, minutes, and seconds
    var timer = duration, minutes, seconds;
    setInterval(function () {
        //convert minutes and seconds and give about .10 decimal places 
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);
        //if minutes are less than 10 then place a 0 in front of the minutes or
            //seconds otherwise minutes and seconds are equal to minutes
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer <= 0) {
            timer = 0;
        }
    }, 1000);
}



// clock logic 
// function startGameClock() {
//     var min = 0;
//     var sec = 0;
//     var hours = 0;
//     var letsStop = 0;
//     let timerBlock = document.querySelector('.timer');

//     setInterval(function() {
//         if (letsStop !== 1) {
//             sec++;
//             if (sec === 60) {
//                 min++;
//                 sec = 0;
//             }
//             if (min === 60) {
//                 hours++;
//                 min = 0;
//                 sec = 0;
//             }
//             timerBlock.innerHTML = (hours + ':' + min + ':' + sec);
//             // if(letsStop === 1)
//             // {
//             //     break;
//             // } 
//             console.log(min);
//             console.log(sec);
//         }

//     }, 1000);
// }


