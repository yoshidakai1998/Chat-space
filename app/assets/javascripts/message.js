$(document).on('turbolinks:load', function() {
  function buildHTML(message){
    image = (message.image === null) ? "" : `<img src="${message.image}" class="lower-message__image">`
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                   </div>
                  </div>
                  ${image}`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('#new_message')[0].reset()
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('error');
    })
    .always(function(message) {
      $('.form__submit').prop('disabled',false);
    })
  })

  var interval = setInterval(function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data('message-id') || 0;
      $.ajax({
        url: location.href,
        type: 'GET',
        data: { id: last_message_id },
        dataType: 'json'
      })
      .done(function(data) {

        var id = $('.message').data('message-id')
        var insertHTML = '';
        data.forEach(function(message) {
          if (message.id > id ) {
            insertHTML = buildHTML(message);
            $('.messages').append(insertHTML);
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
          }
        });
      })
      .fail(function(data) {
        alert('自動更新に失敗しました');
      });
    } else {
      clearInterval(interval);
    }}, 5000 );
  });

