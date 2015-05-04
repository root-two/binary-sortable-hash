# binary-sortable-hash

Hash arrays of numbers into a binary string from which you can reconstruct the
original values, with configurable precision loss. The generated hashes
**sort well**, so similar input values cause large shared prefixes in hashes. (as seen in [geohashing](http://en.wikipedia.org/wiki/Geohash))

```js
sortable.encode([0]) === '011111111111111111111111111111111111111111111111111111111111';
sortable.decode(011111111111111111111111111111111111111111111111111111111111, 1) === -8.673617379884035e-17
sortable.encode([10, 11, -10]) === '110001001001110110011001100100001011100110001001100110011011';
```

[![build status](https://secure.travis-ci.org/rt2zz/binary-sortable-hash.png)](http://travis-ci.org/rt2zz/binary-sortable-hash)

## Usage

Hash a lat/lon array representing Röcken Germany

`[10, -10, 10]` and then restore it, using different
hash sizes.

```js
var sortable = require('sortable-hash');

var rocken = {lat: 51.2408, lon: 12.1161}
//normalize scalars to +-100
var normalized = [100*rocken.lat/180, 100*rocken.lon/90]

var hash = sortable.encode(normalized)
// => '110010010010000100101111010001010001001110011100001100111111'

sortable.decode(hash, 2);
// => [ 51.24080015346408, 12.116099959239364 ]

var lowerFidelityHash = sortable.encode(normalized, 10)
// => 1100100100
sortable.decode(lowerFidelityHash, 2)
// => [50.625, 14.0625]

var hexadecimalHash = parseInt(hash, 2).toString(16)
// => c9212f45139c300 (limited precision beyond 53bits)
```

**note:** If you need precision when converting integers above 53 bits consider using [bigint](https://github.com/substack/node-bigint)

## API

### sortable.encode(values[, options])

Hash the array `values`, which may only contain Numbers in the range of
`[-100, 100]`.

`options` can either be an object with these possible keys:

* `precision`: Number of bits (read: length) of the resulting binary hash

or a Number, in which case it sets `options.precision`.

### sortable.decode(string, options)

Decode `string` into an Array of Numbers.

`options` can either be an object with these possible keys:

* `num`: number of elements initially passed to `hash.encode`. (required)

Or a Number, in which case it sets `options.num`

## Installation

With [npm](http://npmjs.org) do:

```bash
$ npm install binary-sortable-hash
```

## Kudos

This is the idea of [geohashes](http://en.wikipedia.org/wiki/Geohash)
generalized for use with all numeric data and numbers of input fields.

binary-sortable-hash is a derivative of the awesome [sortable-hash](https://github.com/juliangruber/sortable-hash) by @juliangruber
