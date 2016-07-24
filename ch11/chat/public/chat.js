window.onload = function () {
  var socket = io();
  socket.on('connect', function () {
    // send a join event with your name
    socket.emit('join', prompt('What is your nickname?'));

    // show the chat
    document.getElementById('chat').style.display = 'block';

    socket.on('announcement', function (msg) {
      var li = document.createElement('li');
      li.className = 'announcement';
      li.innerHTML = msg;
      document.getElementById('messages').appendChild(li);
    });

    function addMessage (from, text) {
      var li = document.createElement('li');
      li.className = 'message';
      li.innerHTML = '<b>' + from + '</b>: ' + text;
      document.getElementById('messages').appendChild(li);

      return li;
    }

    var input = document.getElementById('input');

    document.getElementById('form').onsubmit = function () {
      var li = addMessage('me', input.value);

      socket.emit('text', input.value, function (date) {
        li.className = 'confirmed';
        li.title = date;
      });

      // reset the input
      input.value = '';
      input.focus();

      return false;
    }

    socket.on('text', addMessage);

    // search form
    var form = document.getElementById('dj');
    var results = document.getElementById('results');
    form.style.display = 'block';
    form.onsubmit = function () {
      results.innerHTML = '';
      socket.emit('search', document.getElementById('s').value, function (songs) {
        return false;
      });

      // if the web page submit to itself, the connect event invoked again.
      return false;
    }

    socket.on('elected', function () {
      form.className = 'isDJ';
    });
  });
}
