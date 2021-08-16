// add all the code to emit and handle events for our chat.
// which connects the client to the Socket.io instance running on the host that served the page (our server):

console.log('chat.js file loaded!');

// IMPORTANT! By default, socket.io() connects to the host that
// served the page, so we dont have to pass the server url
let socket = io.connect();

// storing the information of each client connected to our server.
// To identify each client, we'll ask the users to enter their name in a promt and additionally, we'll save their socket id.

// prompt to ask user's name
const username = prompt('Welcome! Please enter your name:')

// emit event to server with the user's name
socket.emit('new-connection', { username }) // The first parameter is the event name and the second parameter is the data we're sending, the username.

// captures welcome-message event from the server
socket.on('welcome-message', (data) => {
    console.log('received welcome-message >>', data)
})

// the most used functions when working with Socket.io are socket.emit(eventName, data) and socket.on(eventName, data) to emit and capture events in both the server and the clients.
// remember to have an socket.on() function for each event you send with socket.emit()