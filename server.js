var httpServer = require('http').createServer(function(req, response){ /* Serve your static files */ })
httpServer.listen(9999);

var nowjs = require("now");
var everyone = nowjs.initialize(httpServer);

everyone.now.logStuff = function(msg){
    console.log(msg);
}