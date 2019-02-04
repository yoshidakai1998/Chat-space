$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    image = (message.image === null) ? "" : `<img src="${message.image}" class="lower-message__image">`
    var html =`<div class="message">
                 <div class="upper-message">
                   <div class="upper-message__user-name">
                     ${message.user_name}
                   </div>
                   <div class="upper-message__date">
                     $(message.created_at)
                   </div>
                 </div>
                 <div class="lower-message">
                   <p class="lower-message__content">
                     $(message.content)
                  </p>
                 </div>
                 $(image)`
    return html;
  }

  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json'
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
    .always(function(message){
      $('.form__submit').prop('disabled',false);
    })
  })
});

