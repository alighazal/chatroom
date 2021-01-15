import React, {useEffect, useState} from 'react';
import queryString from 'query-string';
import  io  from 'socket.io-client';
import ScrollToBottom, { useScrollTo } from 'react-scroll-to-bottom';

import './Chat.css';




let socket;


const Chat = ({location}) => {


    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = "localhost:5000";

    useEffect( () => {
        const {name, room} = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setRoom(room);
        setName(name);

        socket.emit( "join" , {name, room}, (error)=> { if (error) alert(error)});

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
        
    }, [ENDPOINT, location.search] );

    useEffect (
        () => {
            socket.on('message', message => {
                setMessages(messages => [ ...messages, message ]);
            });

        },
        []
    );

    useEffect (
        ()=>{
            socket.on("roomData", ({ users }) => {
                setUsers(users);
              });
        }, []
    );


    const sendMessage = (event) => {

        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }

    };

    console.log()


 
    return ( 
        <div>
            <h1>chat</h1>
            <div style = {{ display: "flex"}} >
                <div style = {
                    {height: 300,
                    width: "30%", 
                    borderColor: "black", 
                    borderWidth: 2, 
                    borderStyle: "solid",
                    display: "flex",
                    flexDirection: "column",
                    }} >
                    <ScrollToBottom className = "messages">

                        {
                            messages.map(( message, index) => {
                                return (
                                <div>
                                    <div>{message.user} : {message.text}</div>
                                </div>
                                )
                            } )
                        }
                    </ScrollToBottom>
                    
                </div>

                <div
                style = {
                    {
                    height: 300,
                    minWidth: "20%", 
                    borderColor: "black", 
                    borderWidth: 2, 
                    borderStyle: "solid",
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: 10
                    }} >
                        
                    <div>users count = {users.length}</div>
                    <br/>
                    <ul>
                    {
                        users.map((user, index) => {
                            return (
                            <li>{user.name}</li>
                            )
                        })
                    }
                    </ul>
                </div>
            </div>

                <div>
                    <input  type = 'text'
                        value = {message}
                        onChange = {(event)=> setMessage(event.target.value) }
                        onKeyPress = {event => event.key == 'Enter' ? sendMessage(event) : null}    />
                    <button
                        onClick = {(event)=> sendMessage(event)}> send! </button>

                </div>

            
        </div>
    );
};

  

export default Chat;