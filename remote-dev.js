nowjs = require('now');
_ = require('underscore');

(function (nowjs) {

  var devFns = {
    // registerDev: function (room) {
    //   room = room || this.now.room;
    //   nowjs.getGroup(room).addUser(this.user.clientId);
    //   console.log('registering dev', this.user.clientId, room);
    // },
    // getClients: function (room) {
    //   room = room || this.now.room;
    //   nowjs.getGroup(room).getUsers(function (users) {
    //     _.each(users, function (u) {
    //       console.log('user: ', u);
    //     });
    //   });
    // },
    onClients: function (cmd, room) {
      room = room || this.now.room;
      console.log('called on lcients', cmd, room);
      nowjs.getGroup(room).now.executeCmd(cmd, this.user.clientId);
    },
    clientResponse: function (msg) {
      console.log('dev recieved message: ', msg);
      this.now.showResponse(msg);
    }
  };

  var dev = {
    fns: devFns
  };

  module.exports = dev;

})(nowjs);
