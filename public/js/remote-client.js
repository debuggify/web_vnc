(function ($, now) {
  $(document).ready(function(){

    now.type = "client";

    now.registerClient();

    now.receiveMessage = function(name, message, byAgent){
      byAgent = typeof byAgent !== undefined ? byAgent : "unknow";
      $("#messages").append("<br><b>[" + byAgent + "]" + name + "</b>: " + message);
    };

    $("#send-all-developers").click(function(){
      now.distributeMessage('developers', $("#text-input").val());
      $("#text-input").val("");
    });

    $("#send-all-clients").click(function(){
      now.distributeMessage('clients', $("#text-input").val());
      $("#text-input").val("");
    });

    $("#send-all").click(function(){
      now.distributeMessage('clients', $("#text-input").val());
      now.distributeMessage('developers', $("#text-input").val());
      $("#text-input").val("");
    });

    $(".change").click(function(){
      now.changeRoom($(this).text());
    });

    $("#text-input").keypress(function (e) {
      if (e.which && e.which === 13) {
        $("#send-button").click();
        return false;
      }
      return false;
    });

    now.name = prompt("What's your name?", "");

    $("#text-input").focus();

  });
})(jQuery, now);
