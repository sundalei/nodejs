'use strict';

var a = function() {
  console.log('function' === typeof a);
  console.log('window === this: ' + (window === this));
}

a();
