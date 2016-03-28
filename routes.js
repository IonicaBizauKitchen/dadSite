var fs = require('fs');
var url = require('url');
var path = require('path');

fileExtensions = {
    '.html':'text/html',
    '.css':'text/css',
    '.js':'text/javascript',
    '.jpeg':'image/jpg',
    '.ttf': 'font/opentype',
    '.gif': 'image/gif'
};

function determineType(ext){
	var type;
	for (var i in fileExtensions){
		if(i === ext){
			type = fileExtensions[i];
			break;
		}
	};
	return type;
}

function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request received for "+pathname);

		if(request.url === '/'){
			response.writeHead(200, {"Content-Type": "text/html"});
			fs.createReadStream('./staticAssets/index.html').pipe(response);
		} else {
			var ext = path.extname('./staticAssets'+pathname);

			fs.access('./staticAssets'+pathname, fs.R_OK, function(error){
				if(error){console.log('file does not exist')};
				response.writeHead(200, {'Content-Type': determineType(ext)});
				fs.createReadStream('./staticAssets'+pathname).pipe(response);
				console.log('served '+request.url);
			})
		}
};

module.exports = onRequest;