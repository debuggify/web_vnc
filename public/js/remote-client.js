(function ($, now) {
  $(document).ready(function(){

    now.type = "client";

    // now.receiveMessage = function(name, message, byAgent){
    //   byAgent = typeof byAgent !== undefined ? byAgent : "unknow";
    //   $("#messages").append("<br><b>[" + byAgent + "]" + name + "</b>: " + message);
    // };


    now.receiveMessage = function(name, message, byAgent){
      byAgent = typeof byAgent !== undefined ? byAgent : "unknow";
      $("#output").append('<li class="echo"><span class="gutter"></span><div>' + "<b>[" + byAgent + "][ " + name + " ]</b>" + message + '<a href="#" class="permalink" title="permalink">link</a></div></li>');
    };

    $("#send-all-developers").click(function(){
      now.distributeMessage('developers', $("#exec").val());
      $("#exec").val("");
    });

    $("#send-all-clients").click(function(){
      now.distributeMessage('clients', $("#exec").val());
      $("#exec").val("");
    });

    $("#send-all").click(function(){
      now.distributeMessage('clients', $("#exec").val());
      now.distributeMessage('developers', $("#exec").val());
      $("#exec").val("");
    });

    $(".change").click(function(){
      now.changeRoom($(this).text());
    });

    $("#exec").keypress(function (e) {
      if (e.which && e.which === 13) {
        $("#send-all").click();
        return false;
      }
    });

    now.name = prompt("What's your name?", "");

    $("#exec").focus();

  });
})(jQuery, now);
