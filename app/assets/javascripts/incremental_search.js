$(function(){

var search_list = $(".user-search-result");
// 一致する人を表示
  function appendUser(user) {
    var html =
              `<div class="chat-group-user clearfix">
              <p class="chat-group-user__name">${ user.name }</p>
              <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
              </div>
              `
    search_list.append(html);
  }
  function appendNoUser(user) {
    var html =
              `<div class="chat-group-user clearfix">
              <p class="chat-group-user__name">見つかりません</p>
              </div>
              `
    search_list.append(html);
  }
  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input},
      dataType: 'json'
    })

    .done(function(users){
      $(".user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }else{
        appendNoUser("一致する人がいません");
      }
    })
    .fail(function() {
      alert('人物検索に失敗しました');
    })
  });

  function appendHTML(id, name){
    var html=`
              <div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
               <input name='group[user_ids][]' type='hidden' value='${ id }'>
               <p class='chat-group-user__name'>${ name }</p>
               <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>
             `
    return html;
  }

  $(document).on("click", ".user-search-add", function(){
    var id = $(this).data('user-id');
    var name = $(this).data('user-name');
    var html = appendHTML(id, name);
    $("#chat-group-users").append(html);
    $(this).parent().remove();
  });

  $(document).on("click", ".user-search-remove", function(){
    $(this).parent().remove();
  })
});
