let socket = io.connect();

// User name
const name = prompt('What is your name?');
target = document.getElementById('name');
target.innerHTML +=  (`${input.name}`);
socket.emit('new-user', name);// sending a message to server

socket.on('display-message', message => {
    message.innerHTML = (`${target.target}`);
})
socket.on('user-connected', name => {
    target.innerHTML = (`${name}`);
})
socket.on('user-disconnected', name => {
    target.innerHTML = (`${name} disconnected`);
})

// When we press the button on the client, because of our emit on the client, the server will receive the 'sendToAll' call and execute the piece of code within on the server
let sendAll = document.getElementById('sendAll');
sendAll.addEventListener("click", e => {
    e.preventDefault();
    input = document.getElementById("input").value;
    socket.emit('sendAll', input);
    input.value = ''; // doesn't work, fix it later!!
})

let sendMe = document.getElementById('sendMe');
sendMe.addEventListener("click", e => {
    e.preventDefault();
    input = document.getElementById("input").value;
    socket.emit('sendMe', input);
    input.value = ''; // doesn't work, fix it later!!

})

// We have now sent the message from the client to the server, now we just need to receive it back from the server.
//So now the client is waiting for the call to 'displayMessage' and then it will add that message to your target div.
socket.on("displayMessage", (input) => {
    target = document.getElementById('message-sent');
    target.innerHTML += "<br>" + (`${input.input}`);

})

/*socket.on("displayMessage", (input) => {
    target = document.getElementById('message-received');
    target.innerHTML += "<br>" + (`${input.input}`);

})*/





