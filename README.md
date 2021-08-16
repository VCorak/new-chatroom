# New chatroom with Sockets 🔴🟠🟡🟢🔵🟣

<img src="https://media.giphy.com/media/d2jjL98HvwZJ69yw/giphy.gif" width="100" height="100">
<img src="https://media.giphy.com/media/d2jjL98HvwZJ69yw/giphy.gif" width="100" height="100">
<img src="https://media.giphy.com/media/d2jjL98HvwZJ69yw/giphy.gif" width="100" height="100">




## What is happening on server what on client side?

### Chat server responsibilities

* Serve the HTML, CSS and JavaScript client files to the users
* Start the Socket.io connection
* Receive events from clients (like a new chat message) and broadcast them to other clients

### Chat client responsibilities

* Load socket.io client library from a CDN
* Establish connection with the Socket.io running in our server
* Ask the user to enter his name, so we can identify him in the chat
* Emit and receive events to/from Socket.io running in our server
* Add our own messages to the chat via JavaScript

## Steps (step numbers visible inside code)

1. **Setting up the web server**

- create server.js in server folder and use Node's integrated http module

### Summary: Written code starts a server that handles requests and serves files contained in a folder named client

2. **Create a folder named client with index.html**

- run node server and open http://localhost:9010 in browser to see index page

### Summary: I can see "It works" message!

3. **Initializing Socket.io in the server and client**

- start working on chat. Install socket.io by running npm i socket.io and include socket.io chat event handling in server.js

### Summary: 

- I'm importing socket.io and attaching it to my app server
- With io.on('connection), detect a new connection and log a message in the console including the socket object, which will contain some information from the client.

4. **Modify index.html document to load the socket.io library from a CDN and also load a chat.js file that I created inside the client folder**


5. **In the chat.js file added all the code to emit and handle events for chat**
- it will just connect the client to the Socket.io instance running on the host that served the page- server
- load the server on terminal, and I can see "New socket connected" message and when opening multiple tabs I can see multiple messages

6. **Creating the chat and storing the connected clients**

- in chat.js storing the information of each client connected to server
  - to identify each client, ask the users to enter their name in a promt and additionally save their socket id

### Summary: 

- using the prompt() method to request the username. With socket.emit() emitting to server. The first parameter is the event name and the second parameter is the data we're sending, in this case, just the username. 
- using socket.on() we capture events sent from the server to the clients.

- in server, have to capture the event like this: added a users object in which will store all the users connected. To capture the event sent from the client, use the socket.on() method which receives the data sent from the client, containing the username. After saving the user details emit another event, this time from the server to the client with a welcome message.
- the most used functions when working with Socket.io are socket.emit(eventName, data) and socket.on(eventName, data) to emit and capture events in both the server and the clients. Just remember to have an socket.on() function for each event you send with socket.emit()

7. **Handling chat messages**

- need to create the HTML input to enter the message to send and the container that will hold all the conversation's messages.

8. **In chat.js create function to append messages to chat container and invoke it right after we receive the welcome-message event from the server**

- this function will receive a data object which will contain the username and the message itself, and a isSelf flag which indicates if the message is ours. 
  - we'll use this second parameter to choose a different style to display the message

9. **Send messages from a client and broadcast them to all the other clients**

- have to add an event listener in submit button and use the socket.emit() function in the client to send the message to server

10. **In server, need to capture the new-message event using the socket.on() method and emit the broadcast-message event**

## CONCLUSION

I really enjoyed creating this assigment all over again. Maybe it looks a bit stuffed with comments, but I really wanted to understand every step I'm writing.
First assigment also helped very much with every step written, so I was inspired to do so again, bcs part that I did not know how to do
was to separate my messages from other users massages, I've got everything in one container. Now it is much clearer. 
I could maybe write better css and will try to implement that Whatsapp css from first assigment- maybe... 😁
Sockets really amaze me, this is so powerful library but it is not so difficult to understand when you
take effort. And I have my own chat app- vaaauuu!! 

<img src="https://media.giphy.com/media/2xPGQWsvyztoneIerN/giphy.gif" width="200" height="200">