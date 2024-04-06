'use strict';
var scores, roundScores, activePlayer, gamePlaying /*dice*/;

init();

/************* eventListener using callback function
function btn(){
    //do something
}
btn();
document.querySelector('.btn--roll').addEventListener('click', btn)
***********/



// addEventListener using anonymus function
document.querySelector('.btn--roll').addEventListener('click', function() {
    if(gamePlaying) {
        //1. Random number
        var dice0 = Math.floor((Math.random() * 6) + 1);
        var dice1 = Math.floor((Math.random() * 6) + 1);
        var dice = dice0 + dice1;
        //2. display the result
        document.querySelector('#dice').style.display = 'block';
        document.querySelector('#dice-1').style.display = 'block';
        document.querySelector('#dice').src = 'dice-' + dice0 + '.png';
        document.querySelector('#dice-1').src = 'dice-' + dice1 + '.png';
        /* But you can also equate 
        document.querySelector('.dice') to a variable e.g var diceDOM i.e
        var diceDOM = document.querySelector('.dice')
        to make it neater */

        //3. update roundscore only if the rolled number is not = 1
        if (dice0 !== 1 && dice1 !==1) {
            //Add score
            roundScores += dice; // same as writing roundScores = roundScores(current roundScore) + dice
            document.querySelector('#current--' + activePlayer).textContent = roundScores;
        } else {
            //Next players turn
            nextPlayer();
        }
    }
    

});

document.querySelector('.btn--hold').addEventListener('click',function() {
    if(gamePlaying) {
        //Add the current score to the global score
        scores[activePlayer] += roundScores
        
        //update the UI
        document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];
        
        var input = document.querySelector('.final-score').value;
        var winningScore;
        if (input) {
            winningScore = input
        } else {
            winningScore = 100
        }

        //check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name--' + activePlayer).textContent = 'winner!';
            document.querySelector('#dice').style.display = 'none';
            document.querySelector('#dice-1').style.display = 'none';
            document.querySelector('.player--' + activePlayer).classList.add('player--winner');
            document.querySelector('.player--' + activePlayer).classList.remove('player--active');
            gamePlaying = false
        } else {
            // document.querySelector('.player--' + activePlayer).classList.remove('player--active');
            // document.querySelector('.player--' + activePlayer).classList.add('player--active');
            nextPlayer();
        }
    }
});




function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //tenery
        roundScores = 0

        document.getElementById('current--0').textContent = '0';
        document.getElementById('current--1').textContent = '0';

        document.querySelector('.player--0').classList.toggle('player--active');
        document.querySelector('.player--1').classList.toggle('player--active');

        document.querySelector('#dice').style.display = "none";
        document.querySelector('#dice-1').style.display = "none"
    
};

document.querySelector('.btn--new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    roundScores = 0;
    activePlayer = 0;
    gamePlaying = true;
    var x = document.querySelector('#score--0').textContent;

    document.querySelector('#dice').style.display = 'none';
    document.querySelector('#dice-1').style.display = 'none';

    document.getElementById('score--0').textContent = '0';
    document.getElementById('current--0').textContent = '0';
    document.getElementById('score--1').textContent = '0';
    document.getElementById('current--1').textContent = '0';
    document.getElementById('name--0').textContent = 'Player 1';
    document.getElementById('name--1').textContent = 'Player 2';
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');
}
// dice = Math.floor((Math.random() * 6) + 1);
// console.log(dice);
//document.querySelector('#current--' + activePlayer).textContent = dice;