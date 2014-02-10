# three-times
Execute a function up to three times before calling the callback with the last error.

## Basic example
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
## Events
If the callback parameter is omitted, you can listen for events instead.

```javascript
retry(foo).on('error', function (err) {
    console.error(err);
}).on('done', function (result) {
    console.log(result);
});

```
