/*
 * Create a list that holds all of your cards
 */

 const deckOfCards = ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube",
 "fa-leaf","fa-bicycle","fa-bomb","fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube",
 "fa-leaf","fa-bicycle","fa-bomb"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 CardShuffle(deckOfCards);

 function CardShuffle(array){
 	shuffle(array);
 	const deck = document.getElementById("deck");
 	for (i = 0; i < 16; i++) {
	let card = deckOfCards[i];
 	document.getElementById("deck").children[i].children[0].setAttribute("class","fa " + card);
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
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let cardsopen = 0;
let firstcard ;
let secondcard ;
let matches = 0;
let moves = 0;

//starting function to open a card and compare it to
function compareCard(){
	for (i = 0; i < 16; i++){
		let pickedCard = document.getElementById("deck").children[i];
    pickedCard.addEventListener("click", function basic(){
    movesCounter();
			if(cardsopen == 0){
		pickedCard.setAttribute("class","card open show")
		firstcard = pickedCard;
	    cardsopen++;
	}
	  else if(cardsopen == 1){
    pickedCard.setAttribute("class","card open show");
    secondcard = pickedCard;
    cardsopen = 0;
    setTimeout(function()
    	{ evalComparism()}, 700);
}})}}

compareCard();

//evaluates firstCard and secondCard. If they are equal, the cards class match is beeing added
function evalComparism(){
	if (firstcard.children[0].classList.value == secondcard.children[0].classList.value){
		firstcard.setAttribute("class","card match");
		secondcard.setAttribute("class","card match");
		firstcard.addEventListener("click",function(){});
		firstcard.style.pointerEvents = "none";
		secondcard.style.pointerEvents = "none";
         matches++;
        won();


	} else {
		firstcard.setAttribute("class", "card");
		secondcard.setAttribute("class", "card");
	}
}

//counts the moves
function movesCounter(){
moves ++;
document.getElementById("moves").innerText = moves;
}

// determines wether all matches has been found or not
function won(){

    if (matches == 8){
        alert("You won!");
    }
}

//Restart Handler
document.getElementById("restart").addEventListener("click" ,function(){
  CardShuffle(deckOfCards);
  cardsopen = 0;
  moves = -1;
 movesCounter();
  for (i = 0; i < 16; i++) {
    document.getElementById("deck").children[i].setAttribute("class","card");
    document.getElementById("deck").children[i].style.pointerEvents = "";
  }
});



