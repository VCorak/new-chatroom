// add all the code to emit and handle events for our chat.
// which connects the client to the Socket.io instance running on the host that served the page (our server):

console.log('chat.js file loaded!');

// IMPORTANT! By default, socket.io() connects to the host that
// served the page, so we dont have to pass the server url
let socket = io.connect();

