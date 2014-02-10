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

retry(foo).on('error', function (err) {
    console.error(err);
}).on('done', function (result) {
    console.log(result);
});

```