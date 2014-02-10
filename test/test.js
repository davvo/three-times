var assert = require('assert'),
    retry = require('../lib/index');


function makefn(count) {
    var times = 0;
    return function (done) {
        if (++times === count) {
            done(null, times);
        } else {
            done(new Error());
        }
    }
}

describe('events', function () {
    it('should succeed after executed three times', function () {
        retry(makefn(3)).on('error', function (err) {
            assert.fail();
        }).on('done', function (result) {
            assert.equal(3, result);
        });
    });
    it('should fail after executed three times', function () {
        retry(makefn(4)).on('error', function (err) {
            assert.notEqual(null, err);
        }).on('done', function (result) {
            assert.fail();
        });
    });    
});

describe("callbacks", function() {
    it('should succeed after executed once', function () {
        retry(makefn(1), function (err, result) {
            assert.equal(null, err);
            assert.equal(1, result);
        });
    });
    it('should succeed after executed twice', function () {
        retry(makefn(2), function (err, result) {
            assert.equal(null, err);
            assert.equal(2, result);
        });
    });
    it('should succedd after executed five times', function () {
        retry(makefn(5), function (err, result) {
            assert.equal(null, err);
            assert.equal(5, result);
        }, 5);
    });it('should give error after executed three times', function () {
        retry(makefn(999), function (err, result) {
            assert.notEqual(null, err);
            assert.equal(null, result);
        });
    });
    it('should give error after executed five times', function () {
        retry(makefn(999), function (err, result) {
            assert.notEqual(null, err);
            assert.equal(null, result);
        }, 5);
    });
});