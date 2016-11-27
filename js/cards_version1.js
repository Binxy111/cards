$(document).ready(function(){

    // globals vars
    var cardsDrawnCount = 0;
    var newDeck = [];

    // setup
    function setup() {
        cardsDrawnCount = 0;
        newDeck = [];
        // create a copy of cards so we can eliminate the drawn cards
        for (var i=0; i < cards.length; i++) {
            newDeck[i] = cards[i];
        }
        // shuffle the new deck
        newDeck = shuffle(newDeck);

        // write number of cards in the deck
        $('#cardsLeft').text(newDeck.length);
        $('#cardsDrawn').text(cardsDrawnCount);
    }

    // run the setup function
    setup();

    // function handles all the card draws (each click on deck)
    $('#rightcard img').click(function() {
        var num = Math.floor(Math.random() * (newDeck.length - 1) );
        // number above changes each turn
        // now find that index in the JSON file array
        var playerCard = newDeck[num];
        // create path to card image, using the properties in the card object
        var card = 'cards/' + playerCard.suit + playerCard.number + '.png';

        // function to show the new card image
        placeCardImage(card);

        // write how many cards have been drawn
        cardsDrawnCount++;
        $('#cardsDrawn').text(cardsDrawnCount);

        // remove object from the array (remove card)
        newDeck.splice(num, 1);

        // write how many cards are left in the face-down deck
        $('#cardsLeft').text(newDeck.length);

        // run function if cards on right are all gone
        if (newDeck.length <= 0) {
            deckIsFinished();
        }

    }); // end the click event handler

// put the selected card image on the left side
function placeCardImage(card) {
    if (cardsDrawnCount <= 0) {
        // places first card
        var faceUpCard = '<img class="card" src="' + card + '" alt="Playing card">';
        $('#leftcard').append(faceUpCard);
    } else {
        // put a new card image on the left side by replacing src value
        $('#leftcard img').attr('src', card);
    }
}

// this only runs when no cards are left unturned
function deckIsFinished() {
    // hide the face-down card on right
    $('#rightcard img').hide();

    // write a message where the card was
    var msg = '<div class="message"><p>No more cards! ';
    msg += 'Click the card at left to start over.</p></div>';
    $('#rightcard').append(msg);

    // show pointer on the left card
    $('#leftcard img').addClass('hand');

    // if they click the left card now
    // event handler for click on the left card
    $('#leftcard img').click(function() {
        $('#leftcard img').remove();
        $('.message').remove();
        $('#rightcard img').show();
        setup();
    }); // end handler
}

// shuffle function copied from
// https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
  var m = array.length, t, i;

  // while there remain elements to shuffle…
  while (m) {

    // pick a remaining element
    i = Math.floor(Math.random() * m--);

    // and swap it with the current element
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}


}); // end (document).ready
