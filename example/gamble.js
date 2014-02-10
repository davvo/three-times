var retry = require('three-times');

function rollDice() {
    return 1 + Math.floor(6 * Math.random());
}

function gamble(done) {
    var dice1 = rollDice(), 
        dice2 = rollDice();
    if (dice1 === 1 && dice2 === 1) {
        done(null, 'Snake Eyes!');
    } else if (dice1 === 4 && dice2 === 5) {
        done(null, 'Jesse James!')
    } else if (dice1 === 6 && dice2 === 6) {
        done(null, 'Midnight!');
    } else {
        done(new Error());
    }
}

retry(gamble, function (err, res) {
    if (err) {
        console.log("No luck :-(");
    } else {
        console.log(res);
    }
});