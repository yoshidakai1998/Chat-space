$(document).on('turbolinks:load', function() {
  function buildMessageHTML(message){
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
      $('#new_message')[0].reset()
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('メッセージの送信に失敗しました');
    })
    .always(function() {
      $('.form__submit').prop('disabled',false);
    })
  })

  var interval = setInterval(function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var lastMessageId = $('.message:last').data('message-id') || 0;
      $.ajax({
        url: location.href,
        type: 'GET',
        data: { id: lastMessageId },
        dataType: 'json'
      })
      .done(function(json) {

        var id = $('.message').data('message-id')
        var insertHTML = '';
        json.forEach(function(message) {
          insertHTML = buildMessageHTML(message);
          $('.messages').append(insertHTML);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
        });
      })
      .fail(function(data) {
        alert('自動更新に失敗しました');
      });
    } else {
      clearInterval(interval);
    }}, 5000 );
});
