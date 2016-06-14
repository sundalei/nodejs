'use strict';

var a = 5;

function woot () {
  console.log('a == 5: ' + (a == 5) );

  var a = 6;

  function test () {
    console.log('a == 6: ' + (a == 6));
  }
  test();
};

woot();
