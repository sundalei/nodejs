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

    // play songs
    var playing = document.getElementById('playing');
    function play(song) {
      if(!song) {
        return;
      }
      playing.innerHTML = '<br><b>Now Playing: </b> ' +
        song.artists[0].name + ' ' + song.name + '<br>';

      var iframe = document.createElement('iframe');
      iframe.frameborder = 0;
      iframe.src = song.mp3Url;
      playing.appendChild(iframe);
    }

    socket.on('song', play);

    // search form
    var form = document.getElementById('dj');
    var results = document.getElementById('results');
    form.style.display = 'block';
    form.onsubmit = function () {
      results.innerHTML = '';
      socket.emit('search', document.getElementById('s').value, function (songs) {
        for (var i = 0, l = songs.length; i < l; i++) {
          (function (song) {
            var result = document.createElement('li');
            result.innerHTML = song.artists[0].name + ' - <b>' + song.name + '</b>';
            var a = document.createElement('a');
            a.href = '#';
            a.innerHTML = 'Select';
            a.onclick = function () {
              socket.emit('song', song);
              play(song);
              return false;
            }
            result.appendChild(a);
            results.appendChild(result);
          })(songs[i]);
        }
      });

      // if the web page submit to itself, the connect event invoked again.
      return false;
    }

    socket.on('elected', function () {
      form.className = 'isDJ';
    });
  });
}
