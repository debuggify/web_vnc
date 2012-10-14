(function ($, now){
  now.ready(function(){
    // now.dev = true;
    now.executeCmd = function (cmd) {
      console.log('dev ignore cmd: ', cmd);
    };
    now.showResponse = function (resp, devId) {
      console.log(resp, devId)
      var type;
      var msg;
      try {
        r = JSON.parse(resp);
        type = r.type || "echo";
        msg = r.response;
        cmd = r.cmd

      } catch (e) {
        msg = resp;
      }

      $("#output").prepend('<li class="' + type + '"><span class="gutter"></span><div class="response">' + "<b>[" + devId + "]</b> <span>" + msg + '</span><a href="#" class="permalink" title="permalink">link</a></div></li>');
    };

    console.log('ready with now');
  });

  // $('#send').click(function () {
  //   console.log('send click');

  // });

  $("#exec").keypress(function (e) {
    if (e.which && e.which === 13) {
      now.onClients( $("#exec").val());
      return false;
    }
  });

})(jQuery, now);
