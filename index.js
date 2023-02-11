'use strict'
//selecting elements
const player0El = document.querySelector('.player-0');
const player1El = document.querySelector('.player-1');
const score0El = document.getElementById('score-0');
const score1El = document.getElementById('score-1');
const current0El = document.getElementById('currentscore-0');
const current1El = document.getElementById('currentscore-1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn-new');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');
const btnwinEl = document.querySelector('.btnwin')
const noteEl = document.querySelector('.cont');
const mainEl = document.querySelector('.main');
const winnerEl = document.querySelector('.winnernote');
const pointsEl = document.querySelector('.points');
//starting conditions
let scores, currentScore, activePlayer, playing;

const starting = function () {
    noteEl.style.display = 'none';
    mainEl.style.display = 'flex';
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    player0El.classList.remove('player-winner');
    player1El.classList.remove('player-winner');
    player0El.classList.add('playeractive');
    player1El.classList.remove('playeractive');
    diceEl.classList.add('hidden');

}
starting();

const switchPlayer = function () {
    currentScore = 0;
    document.querySelector(`#currentscore-${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('playeractive');
    player1El.classList.toggle('playeractive');
}
//implementing the rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        //1. generate a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        //2.display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `./images/dice-${dice}.png`;
        //check if the rolled dice is 1, 
        if (dice !== 1) {
            //add to current score
            currentScore = currentScore + dice;
            document.querySelector(`#currentscore-${activePlayer}`).textContent = currentScore;
            // current0El.textContent = currentScore;
        } else {
            //switch to the next player
            switchPlayer();
        }
    }
})

btnHold.addEventListener('click', function () {
    if (playing) {
        //add currentscore to the activeplayer score
        scores[activePlayer] = scores[activePlayer] + currentScore
        document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
        //check if player score is >=100
        if (scores[activePlayer] >= 10) {
            playing = false
            //finish the game
            document.querySelector(`.player-${activePlayer}`).classList.add('player-winner');
            document.querySelector(`.player-${activePlayer}`).classList.remove('playeractive');
            diceEl.classList.add('hidden');
            mainEl.style.display = 'none'
            noteEl.style.display = 'flex';
            if (activePlayer >=1) { winnerEl.textContent = 'PLAYER 2' }
             else {winnerEl.textContent = 'PLAYER 1' };
            if (activePlayer >=1) { pointsEl.textContent = `${scores[1]} pts` } 
            else { pointsEl.textContent = `${scores[0]} pts` };
        }
        else {

            //switch player
            switchPlayer();
        }
    }
})

btnNew.addEventListener('click', starting);
btnwinEl.addEventListener('click', starting);

