const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');

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
    
    console.log("New Connection!!!");
 
    socket.on("join", ({name,room}, callback) => {
        console.log(name, room);
        const error = true;

        if (error) {
            callback({error: 'error'})
        }
    });
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    
})

app.use(cors());
app.use(router);

server.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})
