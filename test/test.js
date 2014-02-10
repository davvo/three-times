var assert = require('assert'),
    retry = require('../lib/index');


function makefn(count) {
    var times = 0;
    return function (done) {
        if (++times === count) {
            done(null, times);
        } else {
            done(times);
        }
    }
}

describe('events', function () {
    it('should succeed after executed three times', function (done) {
        retry(makefn(3)).on('error', function (err) {
            assert.fail();
        }).on('done', function (result) {
            assert.equal(3, result);
            done();
        });
    });
    it('should succeed after executed five times', function (done) {
        retry(makefn(5), 5).on('error', function (err) {
            assert.fail();
        }).on('done', function (result) {
            assert.equal(5, result);
            done();
        });
    });
    it('should fail after executed three times', function (done) {
        retry(makefn(5)).on('error', function (err) {
            assert.equal(3, err);
            done();
        }).on('done', function (result) {
            assert.fail();
        });
    });    
});

describe("callbacks", function() {
    it('should succeed after executed once', function (done) {
        retry(makefn(1), function (err, result) {
            assert.equal(null, err);
            assert.equal(1, result);
            done();
        });
    });
    it('should succeed after executed twice', function (done) {
        retry(makefn(2), function (err, result) {
            assert.equal(null, err);
            assert.equal(2, result);
            done();
        });
    });
    it('should succedd after executed five times', function (done) {
        retry(makefn(5), function (err, result) {
            assert.equal(null, err);
            assert.equal(5, result);
            done();
        }, 5);
    });it('should give error after executed three times', function (done) {
        retry(makefn(999), function (err, result) {
            assert.equal(3, err)
            assert.equal(null, result);
            done();
        });
    });
    it('should give error after executed five times', function (done) {
        retry(makefn(999), function (err, result) {
            assert.equal(5, err);
            assert.equal(null, result);
            done();
        }, 5);
    });
});