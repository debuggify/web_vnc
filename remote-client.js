nowjs = require('now');

(function (nowjs) {

  var clientList = [];

  var clientFns = {
    registerClient: function (room) {
      room = room || this.now.room;
      nowjs.getGroup(room).addUser(this.user.clientId);
      console.log('registering client', this.user.clientId);
    },
    sendBackDev: function (msg, devId, room) {
      room = room || this.now.room;
      nowjs.getClient(devId, function () {
        if (this.now) {
          this.now.clientResponse(msg);
        }
      });
    }
  };

  var client = {
    fns: clientFns,
    getClients: function () {
      console.log('clientlist:', clientList);
      return clientList;
    }
  };

  module.exports = client;

})(nowjs);
