var test = require('tape');
var encode = require('..').encode;

test('encode', function (t) {
  t.plan(2);

  t.throws(encode.bind(null, [-200]));

  t.equal(encode([10, 11, -10]), '110001001001110110011001100100001011100110001001100110011011');
});
