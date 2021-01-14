import React, {useEffect, useState} from 'react';
import queryString from 'query-string';
import  io  from 'socket.io-client';



let socket;


const Chat = ({location}) => {


    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const ENDPOINT = "localhost:5000";

    useEffect( () => {
        const {name, room} = queryString.parse(location.search);

        socket = io(ENDPOINT);
        console.log(socket, name, room);

        socket.on('msg', (msg)=> {console.log(msg)});

        socket.emit( "join" , {name, room}, ({error})=> {alert(error)});
        
        setRoom(room);
        setName(name);

        return () => {
            socket.emit('disconnect');

            socket.off();
        }
        
    }, [ENDPOINT, location.search] )


    return ( 
        <div>
            <h1>chat</h1>
        </div>
    );
}

export default Chat;