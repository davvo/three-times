var events = require('events');

function retry(fn, done, times, ee) {
    fn(function (err, result) {
        if (err) {
            ee.emit('err', err);
            if (times > 1) {
                process.nextTick(function () {
                    retry(fn, done, times - 1, ee);
                });
            } else if (done) {
                done(err);                
            }
        } else {
            ee.emit('done', result);
            if (done) {
                done(null, result);
            }
        }
    });
}

module.exports = function(fn, done, times) {
    var ee = new events.EventEmitter();
    process.nextTick(function () {
        retry(fn, done, times || 3, ee);
    });
    return ee;
};