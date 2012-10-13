(function ($, now){
  now.ready(function(){
    // now.dev = true;
    now.executeCmd = function (cmd) {
      console.log('dev ignore cmd: ', cmd);
    };
    now.showResponse = function (resp) {
      console.log(resp);
    };

    console.log('ready with now');
  });

  $('#send').click(function () {
    console.log('send click');
    now.onClients('sometihng');
  });

  $("#text-input").keypress(function (e) {
    if (e.which && e.which === 13) {
      $("#send").click();
      return false;
    }
  });

})(jQuery, now);
