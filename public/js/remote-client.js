(function ($, now) {
  $(document).ready(function(){
    now.client = true;
    now.executeCmd = function (cmd, devId) {
      console.log('cmd: ', cmd, devId);
      now.sendBackDev('responded back :' + now.core.clientId, devId);
    };

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

    now.ready(function () {
      now.registerClient();
    });

  });


  function sortci(a, b) {
    return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
  }

  // from console.js
  function stringify(o, simple) {
    var json = '', i, type = ({}).toString.call(o), parts = [], names = [];

    if (type == '[object String]') {
      json = '"' + o.replace(/\n/g, '\\n').replace(/"/g, '\\"') + '"';
    } else if (type == '[object Array]') {
      json = '[';
      for (i = 0; i < o.length; i++) {
        parts.push(stringify(o[i], simple));
      }
      json += parts.join(', ') + ']';
      json;
    } else if (type == '[object Object]') {
      json = '{';
      for (i in o) {
        names.push(i);
      }
      names.sort(sortci);
      for (i = 0; i < names.length; i++) {
        parts.push(stringify(names[i]) + ': ' + stringify(o[names[i] ], simple));
      }
      json += parts.join(', ') + '}';
    } else if (type == '[object Number]') {
      json = o+'';
    } else if (type == '[object Boolean]') {
      json = o ? 'true' : 'false';
    } else if (type == '[object Function]') {
      json = o.toString();
    } else if (o === null) {
      json = 'null';
    } else if (o === undefined) {
      json = 'undefined';
    } else if (simple == undefined) {
      json = type + '{\n';
      for (i in o) {
        names.push(i);
      }
      names.sort(sortci);
      for (i = 0; i < names.length; i++) {
        parts.push(names[i] + ': ' + stringify(o[names[i]], true)); // safety from max stack
      }
      json += parts.join(',\n') + '\n}';
    } else {
      try {
        json = o+''; // should look like an object
      } catch (e) {}
    }
    return json;
  }

  function sortci(a, b) {
    return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
  }

  // from console.js
  function stringify(o, simple) {
    var json = '', i, type = ({}).toString.call(o), parts = [], names = [];

    if (type == '[object String]') {
      json = '"' + o.replace(/\n/g, '\\n').replace(/"/g, '\\"') + '"';
    } else if (type == '[object Array]') {
      json = '[';
      for (i = 0; i < o.length; i++) {
        parts.push(stringify(o[i], simple));
      }
      json += parts.join(', ') + ']';
      json;
    } else if (type == '[object Object]') {
      json = '{';
      for (i in o) {
        names.push(i);
      }
      names.sort(sortci);
      for (i = 0; i < names.length; i++) {
        parts.push(stringify(names[i]) + ': ' + stringify(o[names[i] ], simple));
      }
      json += parts.join(', ') + '}';
    } else if (type == '[object Number]') {
      json = o+'';
    } else if (type == '[object Boolean]') {
      json = o ? 'true' : 'false';
    } else if (type == '[object Function]') {
      json = o.toString();
    } else if (o === null) {
      json = 'null';
    } else if (o === undefined) {
      json = 'undefined';
    } else if (simple == undefined) {
      json = type + '{\n';
      for (i in o) {
        names.push(i);
      }
      names.sort(sortci);
      for (i = 0; i < names.length; i++) {
        parts.push(names[i] + ': ' + stringify(o[names[i]], true)); // safety from max stack
      }
      json += parts.join(',\n') + '\n}';
    } else {
      try {
        json = o+''; // should look like an object
      } catch (e) {}
    }
    return json;
  }


  window.addEventListener('message', function (event) {
    if (event.origin != origin) return;

    run(event);
  }, false);

  function run(event) {
    // eval the event.data command
    try {
      if (event.data.indexOf('console.log') == 0) {
        eval('remote.echo(' + event.data.match(/console.log\((.*)\);?/)[1] + ', "' + event.data + '", true)');
      } else {
        remote.echo(eval(event.data), event.data, undefined); // must be undefined to work
      }
    } catch (e) {
      remote.error(e, event.data);
    }
  }

  var remote = {

    log: function () {
      var argsObj = stringify(arguments.length == 1 ? arguments[0] : [].slice.call(arguments, 0));
      var response = [];
      [].forEach.call(arguments, function (args) {
        response.push(stringify(args, true));
      });

    var msg = JSON.stringify({ response: response, cmd: 'remote console.log', type: msgType });

      if (remoteWindow) {
        remoteWindow.postMessage(msg, origin);
      } else {
        queue.push(msg);
      }

      msgType = '';
    },
    info: function () {
      msgType = 'info';
      remote.log.apply(this, arguments);
    },
    echo: function () {
      var args = [].slice.call(arguments, 0),
          plain = args.pop(),
          cmd = args.pop(),
          response = args;

      var argsObj = stringify(response, plain),
          msg = JSON.stringify({ response: argsObj, cmd: cmd });
      if (remoteWindow) {
        remoteWindow.postMessage(msg, origin);
      } else {
        queue.push(msg);
      }
    },
    error: function (error, cmd) {
      var msg = JSON.stringify({ response: error.message, cmd: cmd, type: 'error' });
      if (remoteWindow) {
        remoteWindow.postMessage(msg, origin);
      } else {
        queue.push(msg);
      }
    }
  };

  // just for extra support
  remote.debug = remote.dir = remote.log;
  remote.warn = remote.info;




})(jQuery, now);
