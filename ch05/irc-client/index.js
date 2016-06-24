'use strict';

var net = require('net');
var stdin = process.stdin;
var nickname;

var client = net.connect(3000, 'localhost');
client.setEncoding('utf-8');

client.on('connect', function () {
  console.log('connect successfully');
  stdin.resume();
  stdin.setEncoding('utf8');
  stdin.on('data', handleData);
});

function handleData(data) {
  if (!nickname) {
    nickname = data;
    nickname = nickname.replace('\r\n', '');
  }
  client.write(data);
}

client.on('data', function (data) {
  console.log(data);
});
