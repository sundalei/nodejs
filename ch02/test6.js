'use strict';

function test () {
  var a = 5;
  try {
    a();
  } catch(e) {
    console.log('e instanceof Error : ' + (e instanceof Error));
  }
  console.log('you got here!');
}

test();
