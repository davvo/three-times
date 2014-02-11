var events = require('events');

function retry(fn, done, times) {
    fn(function (err, result) {
        if (err) {
            if (times > 1) {
                process.nextTick(function () {
                    retry(fn, done, times - 1);
                });
            } else {
                done(err);
            }
        } else {
            done(null, result);
        }
    });
}

function makeDone(ee) {
    return function (err, result) {
        if (err) {
            ee.emit('error', err);
        } else {
            ee.emit('done', result);
        }
    }
}

module.exports = function(fn, done, times) {
    var ee = new events.EventEmitter();
    if (typeof done === 'number') {
        times = done;
        done = undefined;
    }
    done = done || makeDone(ee);
    times = times || 3;
    process.nextTick(function () {
        retry(fn, done, times);
    });
    return ee;
};
