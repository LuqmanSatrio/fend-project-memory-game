
// variables needed for the js to work and its starting value
let cardsopen = 0;
let firstcard ;
let secondcard ;
let matches = 0;
let moves = 0;
let stars = 3;


/*
 * Create a list that holds all of your cards
 */

 const deckOfCards = ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube",
 "fa-leaf","fa-bicycle","fa-bomb","fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube",
 "fa-leaf","fa-bicycle","fa-bomb"];

/*
 * Sets up the event Listener to every single card and ensures the functionality of the game mechanism
 */
compareCard();

/*
 * sets up the default for the game (stars, time, moves)
 */
restart();

showStars();
/*
 * Sets up the timer.
 * source: https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
 */
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);

/*
 * shuffles the card and allign them to its HTML
 */
 function CardShuffle(array){
 	shuffle(array);
 	const deck = document.getElementById("deck");
 	for (i = 0; i < 16; i++) {
	let card = deckOfCards[i];
 	document.getElementById("deck").children[i].children[0].setAttribute("class","fa " + card);
 }
}
/*
 * Sets up the modal.
 * source modal: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal
 */

var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
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




/*
 *  Opens up a card. If its the second card the function evalComparism() is called
 */
function compareCard(){
	for (i = 0; i < 16; i++){
		let pickedCard = document.getElementById("deck").children[i];
    pickedCard.addEventListener("click", function basic(){
			if(cardsopen == 0){
		pickedCard.setAttribute("class","card open show")
		firstcard = pickedCard;
	    cardsopen++;
      blockCard(firstcard);
	}
	  else if(cardsopen == 1){
      movesCounter();
    pickedCard.setAttribute("class","card open show");
    secondcard = pickedCard;
    cardsopen = 0;
    blockDeck();
    setTimeout(function()
    	{ evalComparism()}, 700);
}})}}


//evaluates firstCard and secondCard. If they are equal, the cards class match is beeing added
function evalComparism(){


	if (firstcard.children[0].classList.value == secondcard.children[0].classList.value){
		firstcard.setAttribute("class","card match");
		secondcard.setAttribute("class","card match");
		firstcard.addEventListener("click",function(){});
      matches++;
      won();


	} else {
		firstcard.setAttribute("class", "card");
		secondcard.setAttribute("class", "card");
	}

if(moves>12)
{
  removeFirstStar();
}
else if(moves>18){
  removeSecondStar();
}
unBlockDeck();
blockAllMatchedCard();
}

// counts the moves
function movesCounter(){
moves ++;
document.getElementById("moves").innerText = moves;
}

// determines wether all matches has been made or not, if yes showModal is called
function won(){
    if (matches == 1){
        showModal();
        restart();
    }
}

/*
 * removes the first star
 */
function removeFirstStar()
{
  stars = 2;
  document.getElementById("firstStar").style.color = "black";
}

/*
 * removes the second star
 */
function removeSecondStar(){
   stars = 1;
  document.getElementById("secondStar").style.color = "black";
}

/*
 * brings the stars in its default situation
 */
function showStars(){
document.getElementById("firstStar").style.color = "orange";
document.getElementById("secondStar").style.color = "orange";
document.getElementById("thirdStar").style.color = "orange";
}


/*
 * opens up the modal. Is called when the player has won
 */
function showModal(){
document.getElementById("secondLineModal").textContent = "You got "+ stars +" stars with " +moves +" moves, after "+totalSeconds +" seconds";
modal.style.display = "block";
}

//blocks a specific card
function blockCard(card){
card.style.pointerEvents = "none";
}

//unblocks a given card
function unBlockCard(card){
  card.style.pointerEvents = "";
}

//blocks the whole deck of card
function blockDeck(){
 for (i = 0; i < 16; i++) {
    document.getElementById("deck").children[i].style.pointerEvents = "none";
  }
}

//unblocks the whole deck of card
function unBlockDeck(){
 for (i = 0; i < 16; i++) {
    document.getElementById("deck").children[i].style.pointerEvents = "";
  }
}

/*
 * block all the cars that has been matched, so the cards cant be picked again
 */
function blockAllMatchedCard(){
  var elms = document.getElementsByClassName('match')
for (var i = 0; i < elms.length; i++) {
  elms[i].style.pointerEvents = "none";
}
}

/*
 * sets up timer
 */
function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

/*
 * restarts the game
 */

 function restart(){
document.getElementById("restart").addEventListener("click" ,function(){
  totalSeconds = -1;
  CardShuffle(deckOfCards);
  cardsopen = 0;
  stars = 3;
  moves = 0;
  matches = 0;
document.getElementById("moves").innerText = moves;
  for (i = 0; i < 16; i++) {
    document.getElementById("deck").children[i].setAttribute("class","card");
    document.getElementById("deck").children[i].style.pointerEvents = "";
  }
  showStars();
})};
