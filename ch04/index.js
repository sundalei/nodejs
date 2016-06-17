'use strict';

var a = require('./module_a');
console.log(a.name);
console.log(a.data);
console.log(a.getPrivate());

console.log('-------------------------------');

var Person = require('./person');
var join = new Person('join');
join.talk();
