const diceEL = document.querySelector('#dice');
const score1EL = document.querySelector('#score--1');
const score2EL = document.querySelector('#score--2');
const btnRoll = document.querySelector('#btn--roll');
const btnNew = document.querySelector('#btn--new');
const btnHold = document.querySelector('#btn--hold');
const btnSave = document.querySelector('#btn--save');
const btnWinners = document.querySelector('#btn--winners');
const currentScoreEL1 = document.querySelector('#current--score--1');
const currentScoreEL2 = document.querySelector('#current--score--2');
const player1EL = document.querySelector('#player--1');
const player2EL = document.querySelector('#player--2');
const nameEL = document.querySelector('#name');
const saveEL = document.querySelector('#save--winner');

const bestItemsArray = document.querySelectorAll('#best--item');
const bestItemsEL = document.querySelector('#best--items');

//Initialisation
diceEL.src = '';
score1EL.textContent = 0;
score2EL.textContent = 0;
let currentScore = 0;
let currentPlayer = 1;
let scorePlayer1 = 0;
let scorePlayer2 = 0;
let play = true;
let winners = [];

btnRoll.addEventListener('click', function () {
  if (play === false) return;
  //1.generate random dice
  const dice = Math.trunc(Math.random() * 6 + 1);

  //2.display dice image
  diceEL.src = `./images/dice${dice}.png`; //ES6

  //3.switch player
  if (dice === 1) {
    switchPalyer();
    return;
  }

  //3.dispaly current score
  currentScore += dice;
  if (currentPlayer === 1) {
    currentScoreEL1.textContent = currentScore;
  } else {
    currentScoreEL2.textContent = currentScore;
  }
});

btnHold.addEventListener('click', () => {
  if (play === false) return;
  //1.calculate new score
  if (currentPlayer === 1) {
    scorePlayer1 += currentScore;
    score1EL.textContent = scorePlayer1;
    winner(scorePlayer1);
  } else {
    scorePlayer2 += currentScore;
    score2EL.textContent = scorePlayer2;
    winner(scorePlayer2);
  }
});

btnNew.addEventListener('click', () => {
  diceEL.src = '';
  score1EL.textContent = 0;
  score2EL.textContent = 0;
  currentScore = 0;
  currentPlayer = 1;
  scorePlayer1 = 0;
  scorePlayer2 = 0;
  play = true;
  player1EL.classList.remove('winner');
  player2EL.classList.remove('winner');
  player1EL.classList.add('active');
  player2EL.classList.remove('active');
});

btnSave.addEventListener('click', () => {
  const winner = {
    name: nameEL.value,
    score: currentPlayer === 1 ? scorePlayer1 : scorePlayer2,
  };

  winners.push(winner);

  winners.sort((a, b) => (a.score > b.score ? -1 : 1));

  winners = winners.slice(0, 5);
  console.log(winners);
  saveEL.style.display = 'none';
});

btnWinners.addEventListener('click', () => {
  bestItemsEL.style.display = 'flex';
  for (i = 0; i < winners.length; i++) {
    bestItemsArray[i].textContent = winners[i].name + '----' + winners[i].score;
  }
});

const winner = (score) => {
  if (score >= 20) {
    //end game
    if (currentPlayer === 1) {
      player1EL.classList.add('winner');
    } else {
      player2EL.classList.add('winner');
    }
    currentScoreEL1.textContent = 0;
    currentScoreEL2.textContent = 0;
    diceEL.src = '';
    play = false;
    saveEL.style.display = 'flex';
  } else {
    //switch player
    switchPalyer();
  }
};

const switchPalyer = () => {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  currentScore = 0;
  currentScoreEL1.textContent = 0;
  currentScoreEL2.textContent = 0;
  player1EL.classList.toggle('active');
  player2EL.classList.toggle('active');
};
