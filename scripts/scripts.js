// 1. When the user clicks deal, deal.
var theDeck = [];
var playersHand = [];
var dealersHand = [];
var topOfTheDeck = 4;

$(document).ready(function(){

	$(".deal-button").click(function(){
		createDeck(); //Run a function that creates an array of 1h - 13c
		shuffleDeck();

		// Push onto the playersHand array, the new card. Then place it in the DOM
		playersHand.push(theDeck[0]);
		placeCard("player", "one", theDeck[0]);

		dealersHand.push(theDeck[1]);
		placeCard("dealer", "one", theDeck[1]);

		playersHand.push(theDeck[2]);
		placeCard("player", "two", theDeck[2]);

		dealersHand.push(theDeck[3]);
		placeCard("dealer", "two", theDeck[3]);

		calculateTotal(playersHand, "player");
		calculateTotal(dealersHand, "dealer");
	
	});

	$(".hit-button").click(function(){
		placeCard("player", "three", theDeck[4]);
		var slotForNewCard = "";
		if (playersHand.length === 2) { slotForNewCard = "three"; }
		else if (playersHand.length === 3) { slotForNewCard = "four"; }
		else if (playersHand.length === 4) { slotForNewCard = "five"; }
		else if (playersHand.length === 5) { slotForNewCard = "six"; } //styled for brevity
		placeCard("player", slotForNewCard, theDeck[topOfTheDeck]);
		playersHand.push(theDeck[topOfTheDeck]);
		calculateTotal(playersHand, "player");
		topOfTheDeck++;

	});

	$(".stand-button").click(function(){
		//Player clicked on stand. Nothing happens to player
		var dealerTotal = calculateTotal(dealersHand, "dealer");
		while (dealerTotal < 17) {
			if (dealersHand.length === 2) { slotForNewCard = "three"; }
		else if (dealersHand.length === 3) { slotForNewCard = "four"; }
		else if (dealersHand.length === 4) { slotForNewCard = "five"; }
		else if (dealersHand.length === 5) { slotForNewCard = "six"; }
		placeCard("dealer, slotForNewCard, theDeck[topOfTheDeck]");
		dealersHand.push(theDeck[topOfTheDeck]);
		dealerTotal = calculateTotal(dealersHand, "dealer");
		topOfTheDeck++;
		
		}
			// Dealer has atleast 17, check to see who won
			checkWin();


	});

});
function checkWin() {
	alert("Game over.");
}
function placeCard(who, where, cardToPlace) {
	var classSelector = "." + who + "-cards .card-" + where;

	$(classSelector).html(cardToPlace);
	}

function calculateTotal(hand, whosTurn) {
	// console.log(hand);
	// console.log(whosTurn);
	var total = 0;
	var cardValue = 0;
	for (var i = 0; i < hand.length; i++) {
		cardValue = Number(hand[i].slice(0, -1)) //start from the end
		if (cardValue > 10) {
			cardValue = 10;
		}
	// console.log(hand[i]);
	// console.log(cardValue);
	total += cardValue;
	}

// Update the HTML with the new total
	var elementToUpdate = "." + whosTurn + "-total-number";

	$(elementToUpdate).html(total);
	return total;


}

function createDeck() {
	// Fill the deck with 
	// 	-52 cards.
	// 	-4 suits
	// 		-hearts. spades, diamonds, clubs
	var suits = ["h", "s", "d", "c"];
	for (var s = 0; s < suits.length; s++) {
		for (var c = 1; c <= 13; c++) {
			theDeck.push(c + suits[s]);
		}
	}
}

function shuffleDeck() {
	for (var i = 1; i < 1000; i++) {
		card1 = Math.floor(Math.random() * theDeck.length);
		card2 = Math.floor(Math.random() * theDeck.length);
		var temp = theDeck[card1];
		theDeck[card1] = theDeck[card2];
		theDeck[card2] = temp;
		
	}
}
