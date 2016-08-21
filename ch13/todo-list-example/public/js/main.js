$(function () {
  $('form').submit(function (ev) {
    ev.preventDefault();
    var form = $(this);

    $.ajax(form.attr('action'), {
      method: 'POST',
      data: form.serialize()
    }).done(function (obj) {
      var el = $('<li>');
      if($('#projects-list').length) {
        el.append($('<a>').attr('href', '/project/' + obj.id + '/tasks').text(obj.title + '  '))
          .append($('<a>').attr('href', '/project/' + obj.id).attr('class', 'delete').text('x'));
      } else {
        el.append($('<span>').text(obj.title + '  '))
          .append($('<a>').attr('href', '/task/' + obj.id).attr('class', 'delete').text('x'));
      }
      $('ul').append(el);
    });

    form.find('input').val(''); // clear the input
  });
});
