//player and dealer hands
const dealerHand = document.getElementById("dealer-hand");
const playerHand = document.getElementById("player-hand");
const messageEl = document.getElementById("messages");

// cards
let dealersCards = [];
let playersCards = [];
let isAlive = true;
let message = "";
let hidden;
let deck;
let dealerAceCounter = 0;
let playerAceCounter = 0;
dealersPoints = 0;
playersPoints = 0;

//buttons
const dealBtn = document.getElementById("deal-button");
const hitBtn = document.getElementById("hit-button");
const standBtn = document.getElementById("stand-button");

//event listeners
dealBtn.addEventListener("click", deal);
hitBtn.addEventListener("click", hit);
standBtn.addEventListener("click", stand);

window.onload = function () {
  makeDeck();
  shuffleDeck();
};

function makeDeck() {
  deck = [];
  const suits = ["hearts", "spades", "clubs", "diamonds"];
  const ranks = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];
  for (let i = 0; i < suits.length; i++) {
    for (let e = 0; e < ranks.length; e++) {
      deck.push(ranks[e] + "_of_" + suits[i]);
    }
  }
}

function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    let e = Math.floor(Math.random() * deck.length);
    let temp = deck[i];
    deck[i] = deck[e];
    deck[e] = temp;
  }
}

function deal() {
  renderGame();
  dealBtn.disabled = true;
}

function renderGame() {
  hidden = deck.pop();
  dealersPoints += getValue(hidden);
  dealerAceCounter += checkAce(hidden);
  while (dealersPoints < 17) {
    dealToDealer();
  }
  for (let i = 0; i < 2; i++) {
    dealToPlayer();
  }
}

function getValue(card) {
  let info = card.split("_of_"); // splitting the value from rank and suite
  let value = info[0];

  if (isNaN(value)) {
    // if card is a suite card ( ace, joker, queen, king)
    if (value === "ace") {
      return 11;
    }
    return 10;
  }
  return parseInt(value);
}

function checkAce(card) {
  if (card[0] === "ace") {
    return 1;
  } else {
    return 0;
  }
}

function hit() {
  if (!isAlive) {
    return;
  }
  dealToPlayer();
  if (decreaseAce(playersPoints, playerAceCounter) > 21) {
    //can make Ace value of 1
    isAlive = false;
  }
}

function stand() {
  dealersPoints = decreaseAce(dealersPoints, dealerAceCounter);
  playersPoints = decreaseAce(playersPoints, playerAceCounter);

  isAlive = false;
  document.getElementById("hidden").src = "images/" + hidden + ".png";
  if (playersPoints > 21) {
    message = "you lose :(";
  } else if (dealersPoints > 21) {
    message = "you win! :)";
  } else if ((playersPoints = dealersPoints)) {
    message = "tie!";
  } else if (playersPoints > dealersPoints) {
    message = "you win! :)";
  } else if (playersPoints < dealersPoints) {
    message = "you lose! :(";
  }
  messageEl.innerText = message;
  document.getElementById("player-points").innerText = playersPoints;
  document.getElementById("dealer-points").innerText = dealersPoints;
}

function dealToPlayer() {
  let playerCards = document.createElement("img");
  let card = deck.pop();
  playerCards.src = "images/" + card + ".png";
  playersPoints += getValue(card);
  playerAceCounter += checkAce(card);

  playerHand.append(playerCards);
  playersCards.push(playerCards);
}

function dealToDealer() {
  let dealerCards = document.createElement("img");
  let card = deck.pop();
  dealerCards.src = "images/" + card + ".png";
  dealersPoints += getValue(card);
  dealerAceCounter += checkAce(card);

  dealerHand.append(dealerCards);
  dealersCards.push(dealerCards);
}

/* reduce the total sum if any aces are in hand, and changes 
from 11 to 1 until you hit below 21 or run out of aces
*/
function decreaseAce(playersPoints, playerAceCounter) {
  while (playersPoints > 21 && playerAceCounter > 0) {
    playersPoints -= 10;
    playerAceCounter -= 1;
  }
  return playersPoints;
}
