# chatroom

# Learning Objectives
After this learning challenge, you'll be able to:

* Set up a node environment
  - this was quite clear and smooth
* Make a connection between different clients and the servers
  - had a bit of issues with details in connection, forgot to add some lines of code...but did not take long to realize thankfully...
* Work with sockets
  
    <img src="https://media.giphy.com/media/d2jjL98HvwZJ69yw/giphy.gif" width="100" height="100">

    Sorry had to do it 😃
  
* Configure express and socket.io for node
    * went pretty well- like the instructions in the exercise Readme.md, very neat and clear
* Make a basic chatroom
  * basic chatroom done- works nicely when sending message to all from different tabs in browser and when I send to myself

# Must-have features
* Make a UI that makes it easy for people to send messages in this chatroom.
- [x] It must be possible to send a message to everyone or to yourself
- [x] Make sure we can identify who sent the message through a username.
    * I made a local variable and prompt the user to choose a username
    * And then emited this username along with the sent message to keep track of who sent what.
  #### COMMENT: that was quite a hustler 
    - got lost with the server-client side but managed to untangle at the end. Still have a feeling of messy code, have to learn
 to write less to say more! 
      - in disconnect function I used ```socket.broadcast.emit``` which emits to all connected clients except the sender, so everyone can see that you are disconnected. Still not sure
  about difference between ```socket.emit``` and ```socket.broadcast.emit``` but know that disconnection doesn't work with just emit... 🤔
* Make a list to show everyone who is connected to the chatroom
* Implement something funny! The sky is the limit! (it can be very simple if you want)
    * For example, you could make a functionality to make someone else's font size obscurely small!
    * You could implement a feature where you can speak with someone else's username
* AND SO MUCH MORE -> BE CREATIVE
