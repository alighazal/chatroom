const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');

const {addUser, removeUser, getUsers, getUsersInRoom} = require('./users');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server,{
    cors: {
        origin: "your origin",
        methods: ["GET", "POST"],
        credentials: true
    }
});


io.on('connection', (socket) => {
    
    console.log(`New Connection!!! ${socket.id}`);
 
    socket.on("join", ({name,room}, callback) => {

       const {error, user} = addUser({id: socket.id, name, room});

       if (error) 
            return callback(error);    

        socket.join(user.room);

        socket.emit('message', {user: 'admin', text: `${user.name}, welcome to room ${user.room} `});
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined the room `});

        socket.emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        socket.broadcast.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        

        
        
        callback(); 

    });


    socket.on('sendMessage', (message, callback) => {

        const user = getUsers(socket.id);

        io.to(user.room).emit('message', {user: user.name, text: message});

        callback();
    });
    
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
          }
    });
    
})

app.use(cors());
app.use(router);

server.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})

    
