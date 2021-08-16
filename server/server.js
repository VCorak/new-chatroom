let http = require('http');
let fs = require('fs');
let path = require('path');
let APP_PORT = 9200;
let app = http.createServer(requestHandler);

app.listen(APP_PORT);
console.log(`🖥 HTTP Server running at ${APP_PORT}`);

// handles all http requests to the server
function requestHandler(request, response) {
    console.log(`🖥 Received request for ${request.url}`)
    // append /client to serve pages from that folder
    let filePath = './client' + request.url
    if (filePath == './client/') {
        // serve index page on request /
        filePath = './client/index.html'
    }
    let extname = String(path.extname(filePath)).toLowerCase()
    console.log(`🖥 Serving ${filePath}`)
    let mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
    }
    let contentType = mimeTypes[extname] || 'application/octet-stream'
    fs.readFile(filePath, function (error, content) {
        if (error) {
            if (error.code == 'ENOENT') {
                fs.readFile('./client/404.html', function (error, content) {
                    response.writeHead(404, { 'Content-Type': contentType })
                    response.end(content, 'utf-8')
                })
            } else {
                response.writeHead(500)
                response.end('Sorry, there was an error: ' + error.code + ' ..\n')
            }
        } else {
            response.writeHead(200, { 'Content-Type': contentType })
            response.end(content, 'utf-8')
        }
    })
}
