var test = require('tape');
var encode = require('..').encode;

test('encode', function (t) {
  t.plan(2);

  t.throws(encode.bind(null, [-200]));

  t.equal(encode([10, 11, -10]), '11000100100111011001100110010000');
});
