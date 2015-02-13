var test = require('tape');
var encode = require('..').encode;
var decode = require('..').decode;

test('integration', function (t) {
  t.plan(9);

  t.deepEqual(i(decode(encode([10]), 1)), [10]);
  t.deepEqual(i(decode(encode([10], 32), 1)), [10]);
  t.deepEqual(i(decode(encode([10], 64), 1)), [10]);

  t.deepEqual(i(decode(encode([10, -10]), 2)), [10, -10]);
  t.deepEqual(i(decode(encode([10, -10], 32), 2)), [10, -10]);
  t.deepEqual(i(decode(encode([10, -10], 64), 2)), [10, -10]);

  t.deepEqual(i(decode(encode([10, -10, 10]), 3)), [10, -10, 10]);
  t.deepEqual(i(decode(encode([10, -10, 10], 32), 3)), [10, -10, 10]);
  t.deepEqual(i(decode(encode([10, -10, 10], 64), 3)), [10, -10, 10]);
});

function i (arr) {
  return arr.map(function (e) {
    return Math.round(e);
  });
}
