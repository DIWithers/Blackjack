//game over messages - *check*
//change table
//11,12, 13? - *pics fix it*
//aces?
//player can play forever *check*
//win counter and bet system?
//need a deck to draw from
//cards could be red/black - find imgs for cards -- *check*
//put delay on showing cards
// you can see the dealer's second card on deal


// 1. When the user clicks deal, deal.
var theDeck = [];
var playersHand = [];
var dealersHand = [];
var topOfTheDeck = 4;
var bank = 0;
var bet = 0;
var runningBet = 0;
var cardsDealt = false;

$(document).ready(function(){


	setBank();
		function setBank() {
			bank = prompt("How much money do you have to bet? (No symbols)");
			$(".player-bank").html("Bank:   $  " + bank);
			$(".bet").html("Total bet:   $  " + bet);
		}
		
	// if (cardsDealt === false) {
		$(".bet-5").click(function(){
			if (cardsDealt === false) {
				bank = bank - 5;
				$(".player-bank").html("Bank:   $  " + bank);
				bet = bet + 5;
				$(".bet").html("Total bet:   $  " + bet);
			}
		});

		$(".bet-10").click(function(){
			if (cardsDealt === false) {
				bank = bank - 10;
				$(".player-bank").html("Bank:   $  " + bank);
				bet = bet + 10;
				$(".bet").html("Total bet:   $  " + bet);
			}
		});

		$(".bet-50").click(function(){
			if (cardsDealt === false) {
				bank = bank - 50;
				$(".player-bank").html("Bank:   $  " + bank);
				bet = bet + 50;
				$(".bet").html("Total bet:   $  " + bet);
			}
		});

		$(".bet-100").click(function(){
			if (cardsDealt === false) {
				bank = bank - 100;
				$(".player-bank").html("Bank:   $  " + bank);
				bet = bet + 100;
				$(".bet").html("Total bet:   $  " + bet);
			}
		});
	// }


	$(".deal-button").click(function(){

		cardsDealt = true;
		createDeck(); //Run a function that creates an array of 1h - 13c
		shuffleDeck();

		// Push onto the playersHand array, the new card. Then place it in the DOM
		playersHand.push(theDeck[0]);
		setTimeout(function() {
		placeCard("player", "one", theDeck[0]);
		}, 500);

		dealersHand.push(theDeck[1]);
		setTimeout(function() {
		placeCard("dealer", "one", theDeck[1]);
		}, 1500);

		playersHand.push(theDeck[2]);
		setTimeout(function() {
		placeCard("player", "two", theDeck[2]);
		}, 2000);

		dealersHand.push(theDeck[3]);
		setTimeout(function() {
		placeCard("dealer", "two", theDeck[3]);
		}, 2500);

		setTimeout(function() {
		calculateTotal(playersHand, "player");
		calculateTotal(dealersHand, "dealer");
		}, 2500);
	
	});

	$(".hit-button").click(function(){
			
			var playersTotal = playerTotal = calculateTotal(playersHand, "player");
		if (playersTotal <= 21) { //will not let you hit again if over 21
			placeCard("player", "three", theDeck[4]);
			var slotForNewCard = "";
			if (playersHand.length === 2) { slotForNewCard = "three"; }
			else if (playersHand.length === 3) { slotForNewCard = "four"; }
			else if (playersHand.length === 4) { slotForNewCard = "five"; }
			else if (playersHand.length === 5) { slotForNewCard = "six"; } //styled for brevity
			placeCard("player", slotForNewCard, theDeck[topOfTheDeck]);
			playersHand.push(theDeck[topOfTheDeck]);
			playerTotal = calculateTotal(playersHand, "player");
			topOfTheDeck++;
			if (playerTotal > 21) {
				checkWin();
			}
		}	

	});

	$(".stand-button").click(function(){
		//Player clicked on stand. Nothing happens to player
		
		var dealerTotal = calculateTotal(dealersHand, "dealer");
		while (dealerTotal < 17) {
			if (dealersHand.length === 2) { slotForNewCard = "three"; }
		else if (dealersHand.length === 3) { slotForNewCard = "four"; }
		else if (dealersHand.length === 4) { slotForNewCard = "five"; }
		else if (dealersHand.length === 5) { slotForNewCard = "six"; }
		placeCard("dealer", slotForNewCard, theDeck[topOfTheDeck]);
		dealersHand.push(theDeck[topOfTheDeck]);
		dealerTotal = calculateTotal(dealersHand, "dealer");
		topOfTheDeck++;
		
		}
			// Dealer has atleast 17, check to see who won
			checkWin();
	});

	$(".reset-button").click(function(){
		reset();
	});

	function reset() {
		bet = 0;
		theDeck = [];
		playersHand = [];
		dealersHand = [];
		topOfTheDeck = 4;
		$(".card").html("<img class='cardBack' src='images/card-back.jpg'>");
		calculateTotal(playersHand, "player");
		calculateTotal(dealersHand, "dealer");
	}	

});

function placeCard(who, where, cardToPlace) {
	var classSelector = "." + who + "-cards .card-" + where;
	
	setTimeout(function() {
	$(classSelector).html('<img class="playing-card" src="images/' + cardToPlace + '.png">');
	}, 500);
	setTimeout(function() {
	$(classSelector).flip();
	}, 2000);
}

function checkWin() {
	// alert("Game over.");
	// Get player and dealer totals
	var playerTotal = calculateTotal(playersHand, "dealer");
	var dealerTotal = calculateTotal(dealersHand, "dealer");
	if (playerTotal === 21) {
		alert("BLACKJACK!!! Player wins!");
		bank += bet * 2;
		bet = 0;
		reset();
	}
	else if (dealerTotal === 21) {
		alert("The house always wins in the end...");
		bet = 0;
		reset();
	}
	else if (playerTotal > 21) {
		alert("Sorry, you busted...");
		bet = 0;
		reset();

	}
	else if (dealerTotal > 21) {
		alert("Dealer busts! Player wins!")
		bank += bet * 2;
		$(".player-bank").html("Bank:   $  " + bank);
		bet = 0;
		reset();
		}
	else {
		if (playerTotal > dealerTotal) {
			alert("Player wins!");
			bank += bet * 2;
			$(".player-bank").html("Bank:   $  " + bank);
			bet = 0;
			reset();
			}
		else if (dealerTotal > playerTotal) {
			alert("Sorry, dealer wins!");
			bet = 0;
			reset();
		}
		else {
			alert("Looks like we have a tie. Try again.");
			bank += bet;
			$(".player-bank").html("Bank:   $  " + bank);
			bet = 0;
			reset();
		}
	}
	reset();

}




function calculateTotal(hand, whosTurn) {
	var hasAce = false; //init ace as false
	var total = 0;
	var cardValue = 0;
	for (var i = 0; i < hand.length; i++) {
		cardValue = Number(hand[i].slice(0, -1)) //start from the end
		if ((cardValue === 1) && ((total + 11) <= 21)) { //this card is an ace, check if 11 will fit, if not make it 1
			cardValue = 11;
			hasAce = true;
		}
		else if (cardValue > 10) {
			cardValue = 10;
		}
		else if (((cardValue + total) > 21) && (hasAce)) {
		total = total - 10;
		}
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
$(".reset-button").click(function(){
		reset();
});

function reset() {
	cardsDealt = false;
	bet = 0;
	theDeck = [];
	playersHand = [];
	dealersHand = [];
	topOfTheDeck = 4;
	$(".bet").html("Total bet:   $  " + bet);
	var allCards = document.getElementsByClassName("card");
	for (var i = 0; i < allCards.length; i++ ){
	$(".card").html("<img class='cardBack' src='images/card-back.jpg'>");
	}
	calculateTotal(playersHand, "player");
	calculateTotal(dealersHand, "dealer");
}
		// function resetStack() {
		// var resetCards = document.getElementsByClassName("playing-card");
		// for (var x = 0; x < resetCards.length; x++) {
		// 	resetCards[i].html("img src='images/card-back.jpg'>");
		// }
	


	
	// cardsToClear = document.getElementsByClassName("playing-card");
	// for (var i = 0; i < cardsToClear.length; i++) {
	// 	cardsToClear[i].remove();
	// }
	


