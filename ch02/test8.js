'use strict';

[1, 2, 3].forEach(function(v) {
  console.log(v);
});

var result = [1, 2, 3].filter(function(v) {
  return v < 3;
});

console.log(result);

var result = [5, 10, 15].map(function(v) {
  return v * 2;
});

console.log(result);
