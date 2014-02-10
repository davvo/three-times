# three-times

```javascript
var retry = require('three-times');

function foo(done) {
    done(new Error());
}

retry(foo, function (err, result) {
    if (err) {
        console.error(err);
    } else {
        console.log(result);
    }
});

```

Or you can use events

```javascript
retry(foo).on('error', function (err) {
    console.error(err);
}).on('done', function (result) {
    console.log(result);
});

```

You can override the default number of retries (3)

```javascript
// Try up to 10 times
retry(foo, function (err, result) {
    if (err) {
        console.error(err);
    } else {
        console.log(result);
    }
}, 10);

```