var fs = require('fs');
var express = require('express');

var app = express()
  , http = require('http')
  , server = http.createServer(app);


var nowjs = require("now");
var client = require('./remote-client');
var dev = require('./remote-dev');
var everyone = nowjs.initialize(server);
// Configuration
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');
// app.use('/', express.static(__dirname + '/public'));
// app.use('/js', express.static(__dirname + '/public/js'));
// app.use('/css', express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public'));

// Routes

// app.get('/', function(req, res){
//   res.render('index', {locals: {
//     title: 'NowJS + Express Example'
//   }});
// });

server.listen(9999);

// Odd ones are clients
// Even ones are developers
var count = 0;

nowjs.on('connect', function(){
  // count++;

  // if( count%2 === 0 ) {
  //   //developer
  //   this.now.room = "clients";
  // } else {
  //   // client
  //   this.now.room = "developers";
  // }

  // nowjs.getGroup(this.now.room).addUser(this.user.clientId);
  // console.log(this.now.name + " joined " + this.now.room);
});

nowjs.on('disconnect', function(){
  console.log(this.now.name + " left " + this.now.room);
});

// everyone.now.changeRoom = function(newRoom){
//   this.now.distributeMessage("[leaving " + this.now.room + "]");
//   nowjs.getGroup(this.now.room).removeUser(this.user.clientId);
//   nowjs.getGroup(newRoom).addUser(this.user.clientId);
//   this.now.room = newRoom;
//   this.now.distributeMessage("[entering " + this.now.room + "]");
//   var that = this;
//   nowjs.getGroup(this.now.room).count(function(count){
//     var prettyCount = (count === 1) ? "Room is empty." : (count - 1) + " other(s) in room.";
//     that.now.receiveMessage("SERVER", "You're now in " + that.now.room + ". " + prettyCount);
//   });
// }

// everyone.now.distributeMessage = function(room, message){
//   nowjs.getGroup(room).now.receiveMessage(this.now.name, message, this.now.room);
// };

everyone.now.onClients = dev.fns.onClients;
everyone.now.clientResponse = dev.fns.clientResponse;
everyone.now.registerClient = client.fns.registerClient;
everyone.now.sendBackDev = client.fns.sendBackDev;
