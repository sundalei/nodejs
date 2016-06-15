'use strict';

function a () {
  console.log(this.hello === 'world');
}

var b = a.bind({hello : 'world'});
b();
