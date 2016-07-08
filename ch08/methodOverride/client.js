var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var xhr = new XMLHttpRequest();
xhr.onload = function (e) {
  if (this.status === 200) {
    console.log('got response: ' + this.response);
  }
}
xhr.open('GET', '/resource', true);
//xhr.setRequestHeader('X-HTTP-Method-Override', 'PUT');
xhr.send();
