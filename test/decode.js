var test = require('tape');
var decode = require('..').decode;

test('decode', function (t) {
  t.plan(2);

  t.throws(decode.bind(null, 'numValues required'));

  t.deepEqual(i(decode('11000100100111011001100110010000', 3)), [10, 11, -10]);
});

function i (arr) {
  return arr.map(function (e) {
    return Math.round(e);
  });
}
