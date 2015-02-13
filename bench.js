var hash = require('./');
var ben = require('ben');

//Encode/Decode
var ms = ben(100000, function () {
  hash.decode(hash.encode([10, 10, 10]), 3);
});

console.log('Encode/Decode: %s ms/op', ms);

//Encode/Convert
//bin
var ms = ben(100000, function () {
  hash.encode([10, 10, 10]);
});
console.log('Encode: %s ms/op', ms);


//bin to dec
var decms = ben(100000, function () {
  parseInt(hash.encode([10, 10, 10]), 2);
});
console.log('Encode to Dec: %s ms/op', ms);


//bin to dec to 32
var ttms = ben(100000, function () {
  parseInt(hash.encode([10, 10, 10]), 2).toString(32);
});
console.log('Encode to Dec to 32: %s ms/op', ms);
