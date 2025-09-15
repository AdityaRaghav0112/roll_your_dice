'use strict';


// SELECTING ELEMENTS 
const player0El = document.querySelector('.player--0');
const playerEl =document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const current0El = document.getElementById('current--0');
const currentEl = document.getElementById('current--1');


// STARTING CONDITIONS
let activeplayer,currentScore,playing,scores;

const switchPlayer = function() {
    document.getElementById(`current--${activeplayer}`).textContent = 0;
    currentScore = 0;
    activeplayer = activeplayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    playerEl.classList.toggle('player--active');
}

const initialCondition = function () {
    score0El.textContent = 0;
    score1El.textContent = 0;
    diceEl.classList.add('hidden');
    currentScore = 0;
    scores = [0,0];
    activeplayer = 0;
    playing  = true;
    current0El.textContent = 0;
    currentEl.textContent = 0;
    player0El.classList.remove('player--winner');
    playerEl.classList.remove('player--winner');
    player0El.classList.add('player--active');
    playerEl.classList.remove('player--active');
}
initialCondition();

// ROLLING DICE
btnRoll.addEventListener('click', function() {
    if(playing){
            // generating random number 
    const dice = Math.trunc(Math.random()*6)+1

    // displaying dice 
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`
    console.log(dice);

    // checking if dice displays 1 or not 
    if(dice !== 1){
        // add dice to current score 
        currentScore = currentScore + dice;
        document.getElementById(`current--${activeplayer}`).textContent = currentScore;
    }else{
        // switch to next player
        switchPlayer();
    }

    }
})

btnHold.addEventListener('click' , function () {
    if (playing){
            // add current score 
    scores[activeplayer] += currentScore;
    document.getElementById(`score--${activeplayer}`).textContent = scores[activeplayer];

    // check if score is >=100
    if (scores[activeplayer] >= 100){
        // finish the game 
        playing = false;
        diceEl.classList.add('hidden');
        document.querySelector(`.player--${activeplayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activeplayer}`).classList.remove('player--active');
    }else{
        // switch to the next player
        switchPlayer();
    }
    }    
})

// NEW GAME BUTTON
btnNew.addEventListener('click' , initialCondition);