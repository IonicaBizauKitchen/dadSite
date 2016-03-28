var http = require('http');
var onRequest = require('./routes');
var port = process.env.PORT || 8888;

function start(){
	http.createServer(onRequest).listen(port);
	console.log("Server has started on port "+port);
}

module.exports = start;
