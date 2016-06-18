'use strict';

var ajax = new XMLHttpRequest();
ajax.addEventListener('stateChange', function () {
  if(ajax.readyState === 4 && ajax.responseText) {
    alert('we got some data: ' + ajax.responseText);
  }
});

ajax.open('GET', '/');
ajax.send(null);
