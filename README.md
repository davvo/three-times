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