'use strict';

//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting conditons
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = true;

//Switch Player function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//rolling dice function
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //console.log(dice);
    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `imgs/dice-${dice}.png`;

    //3. Check if rolled 1
    if (dice !== 1) {
      //add dice score to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //if true switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    console.log('Scores of active player is ' + scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if players score is >= 100, or finish game
    if (scores[activePlayer] >= 20) {
      //Finish the game
      playing = false;
      //Hiding dice image when game over
      diceEl.classList.add('hidden');
      //Adding winner backgorund to winner
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      //remomving the active class as game is over
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      //announcing winner on winner class
      document.getElementById(`name--${activePlayer}`).textContent =
        'WINNER 🥳';
    } else {
      //3. Swtich to next player
      switchPlayer();
    }
  }

  //Resetting the game
  btnNew.addEventListener('click', function () {
    console.log('NEW GAME');

    //resetting inital game condtions
    score0El.textContent = 0;
    score1El.textContent = 0;
    diceEl.classList.add('hidden');
    currentScore = 0;
    activePlayer = 0;
    scores = [0, 0];
    playing = true;

    //Setting current scores back to 0
    document.getElementById('current--0').textContent = currentScore;
    document.getElementById('current--1').textContent = currentScore;

    //removing winner class from winner if there is one.
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');

    //removing winner message
    document.getElementById('name--0').textContent = 'Player 1';
    document.getElementById('name--1').textContent = 'Player 2';

    //making player 1 the active player
    document.querySelector('.player--0').classList.add('player--active');
  });
});
