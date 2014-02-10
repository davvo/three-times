var retry = require('three-times');

var count = 0;

function roll(done) {
    count++;
    var dice = 1 + Math.floor(6 * Math.random());
    if (dice !== 6) {
        return done(new Error());
    }
    done(null, count);
}

retry(roll, function (err, res) {
    if (err) {
        console.log("No luck :-(");
    } else {
        console.log("A six on attempt " + res);
    }
});