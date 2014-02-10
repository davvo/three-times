module.exports = function retry(fn, done, times) {
    if (times === undefined) {
        times = 3;
    }
    fn(function (err, result) {
        if (err) {
            if (times > 1) {
                return process.nextTick(function () {
                    retry(fn, done, times - 1);
                });
            }
            return done(err);
        }
        done(null, result);
    });
};