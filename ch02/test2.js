'use strict';

function a () {
  console.log(this.a === 'b');
}

a.call({a : 'b'});
