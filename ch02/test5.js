'use strict';

function Animal (name) {
  this.name = name;
}

Animal.prototype.getName = function () {
  return this.name;
};

var animal = new Animal('tobi');
console.log(animal.getName());

function Ferret (name) {
  Animal.call(this, name);
}

Ferret.prototype = new Animal();

var ferret = new Ferret('hello world');
console.log(ferret.getName());
