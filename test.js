var assert = require('assert'),
    retry = require('./index');

        it('should succeed after executed once', function () {
            var times = 0;
            retry(function (done) {
                times++;
                done(null, "Ok");
            }, function (err, result) {
                assert.notEqual(null, result);
                assert.equal(null, err);
                assert.equal(1, times);
            });
        });
        it('should succeed after executed twice', function () {
            var times = 0;
            retry(function (done) {
                if (++times == 2) {
                    done(null, "Ok");                    
                } else {
                    done(new Error());
                }
            }, function (err, result) {
                assert.notEqual(null, result);
                assert.equal(null, err);
                assert.equal(2, times);
            });
        });
        it('should give error after executed three times', function () {
            var times = 0;
            retry(function (done) {
                times++;
                done(new Error());
            }, function (err, result) {
                assert.notEqual(null, err);
                assert.equal(null, result);
                assert.equal(3, times);
            });
        });
        it('should give error after executed five times', function () {
            var times = 0;
            retry(function (done) {
                times++;
                done(new Error());
            }, function (err, result) {
                assert.notEqual(null, err);
                assert.equal(null, result);
                assert.equal(5, times);
            }, 5);
        });
