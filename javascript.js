const dealerHand = document.getElementById("dealer-hand");
const playerHand = document.getElementById("player-hand");
const dealBtn = document.getElementById("deal-button");
const hitBtn = document.getElementById("hit-button");
const standBtn = document.getElementById("stand-button");
const newCards = document.querySelector(".cards");

dealBtn.addEventListener("click", dealCards);

function dealCards(e) {
  const newCards = document.createElement("img");
  newCards.classList.add("cards");
  newCards.setAttribute("src", "images/2_of_clubs.png");
  newCards.appendChild(playerHand);
  console.log(newCards);
}
