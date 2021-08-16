// 1. STEP
let http = require('http');
let fs = require('fs');
let path = require('path');
let APP_PORT = 9010;
let app = http.createServer(requestHandler);

app.listen(APP_PORT);
console.log(`🖥 HTTP Server running at ${APP_PORT}`);

// handles all http requests to the server
function requestHandler(request, response) {
    console.log(`🖥 Received request for ${request.url}`);
    // append /client to serve pages from that folder
    let filePath = './client' + request.url
    if (filePath === './client/') {
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
                });
            } else {
                response.writeHead(500)
                response.end('Sorry, there was an error: ' + error.code + ' ..\n')
            }
        } else {
            response.writeHead(200, { 'Content-Type': contentType })
            response.end(content, 'utf-8')
        }
    });
}

////////////////////////////////////////////////////////////////////
// 3. STEP
// SOCKET.IO CHAT EVENT HANDLING
const io = require('socket.io')(app, {
    path: '/socket.io',
});

io.attach(app, {
    // includes local domain to avoid CORS error locally
    // configure it accordingly for production
    cors: {
        origin: 'http://localhost',
        methods: ['GET', 'POST'],
        credentials: true,
        transports: ['websocket', 'polling'],
    },
    allowEIO3: true,
});

// we detect a new connection and log a message in the console
// including the socket object, which will contain some information from the client
io.on('connection', (socket) => {
    console.log('👾 New socket connected! >>', socket.id);
});
///////////////////////////////////////////////////////////////////

// need to capture the new-message event using the socket.on() method and emit the broadcast-message event

// 10. STEP
// To save the list of users as id:username
let users = {}

io.on('connection', (socket) => {
    console.log('👾 New socket connected! >>', socket.id)

    // handles new connection
    socket.on('new-connection', (data) => {
        // captures event when new clients join
        console.log(`new-connection event received`, data)
        // adds user to list
        users[socket.id] = data.username
        console.log('users :>> ', users)
        // emit welcome message event
        socket.emit('welcome-message', {
            user: 'server',
            message: `Welcome to this chat ${data.username}. There are ${
                Object.keys(users).length
            } users connected`,
        })
    })
// handles message posted by client
    socket.on('new-message', (data) => {
        console.log(`👾 new-message from ${data.user}`)
        // broadcast message to all sockets except the one that triggered the event
        socket.broadcast.emit('broadcast-message', {
            user: users[data.user],
            message: data.message,
        })
    })
})

// when the server receives the new-message event,
// now we're using socket.broadcast.emit() instead of
// just socket.emit().
// The difference is that when broadcasting, we're sending an event to all clients except the one that sent the original event

//////////////////////////////////////////////////////////////////