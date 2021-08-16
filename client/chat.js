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
    // adds message, not ours
    addMessage(data, false);
})

// the most used functions when working with Socket.io are socket.emit(eventName, data) and socket.on(eventName, data) to emit and capture events in both the server and the clients.
// remember to have an socket.on() function for each event you send with socket.emit()

// receives two params, the message and if it was sent by yourself
// so we can style them differently
// This function will receive a data object which will contain the username and the message itself,
// and a isSelf flag which indicates if the message is ours. We'll use this second parameter to choose a different style to display the message.
function addMessage(data, isSelf = false) {
    const messageElement = document.createElement('div')
    messageElement.classList.add('message')

    if (isSelf) {
        messageElement.classList.add('self-message')
        messageElement.innerText = `${data.message}`
    } else {
        if (data.user === 'server') {
            // message is from the server, like a notification of new user connected
            // messageElement.classList.add('others-message')
            messageElement.innerText = `${data.message}`
        } else {
            // message is from other user
            messageElement.classList.add('others-message')
            messageElement.innerText = `${data.user}: ${data.message}`
        }
    }
    // get chatContainer element from our html page
    const chatContainer = document.getElementById('chatContainer')

    // adds the new div to the message container div
    chatContainer.append(messageElement)
}

// next step is to send messages from a client and broadcast them to all the other clients. We'll have to add an event listener in our submit button and,
// as we've done before, use the socket.emit() function in the client to send the message to our server. We'll also add another event handler for broadcast-message which we'll emit from the server when other clients send a message:

const messageForm = document.getElementById('messageForm')

messageForm.addEventListener('submit', (e) => {
    // avoids submit the form and refresh the page
    e.preventDefault()

    const messageInput = document.getElementById('messageInput')

    // check if there is a message in the input
    if (messageInput.value !== '') {
        let newMessage = messageInput.value
        //sends message and our id to socket server
        socket.emit('new-message', { user: socket.id, message: newMessage })
        // appends message in chat container, with isSelf flag true
        addMessage({ message: newMessage }, true)
        //resets input
        messageInput.value = ''
    } else {
        // adds error styling to input
        messageInput.classList.add('error')
    }
})

socket.on('broadcast-message', (data) => {
    console.log('📢 broadcast-message event >> ', data)
    // appends message in chat container, with isSelf flag false
    // calling the addMessage function to append own message to the chat container without involving server
    addMessage(data, false)
})