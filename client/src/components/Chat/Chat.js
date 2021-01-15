import React, {useEffect, useState} from 'react';
import queryString from 'query-string';
import  io  from 'socket.io-client';
import ScrollToBottom, { useScrollTo } from 'react-scroll-to-bottom';

import styles from './Chat.module.css';




let socket;


const Chat = ({location}) => {


    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [color, setColor] = useState('');
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = "localhost:5000";

    useEffect( () => {
        const {name, room} = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setRoom(room);
        setName(name);
        setColor(getRandomColor());

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

    const getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
      
    
    console.log(color);

    return ( 
        <div className = {styles.outerContainer}> 
            <div className = {styles.title}>Chatroom {room}</div>

            <div className = {styles.sections} >

                <div className = {styles.chatBox}  >
                    <ScrollToBottom className = {styles.messages}>
                        {
                            messages.map(( message, index) => {
                                return (
                                <div>
                                    <div style = {{color: color}}>{message.user} : {message.text}</div>
                                </div>
                                )
                            } )
                        }
                    </ScrollToBottom>

                    <div className = {styles.inputContainer}>
                        <input  type = 'text'
                            className = {styles.input}
                            value = {message}
                            onChange = {(event)=> setMessage(event.target.value) }
                            onKeyPress = {event => event.key == 'Enter' ? sendMessage(event) : null}    />
                        <button
                            className= {styles.button}
                            onClick = {(event)=> sendMessage(event)}> send! </button>

                    </div>
                    
                </div>

                <div className = {styles.activeUsers} >
                        
                    <div className = {styles.usersCount}> No.  Users  : {users.length}</div>
                    <ul style = {{margin: 0, padding: 0}}>
                    {
                        users.map((user, index) => {
                            return (
                            <li className = {styles.userNames}>- {user.name}</li>
                            )
                        })
                    }
                    </ul>
                </div>
            </div>

                

            
        </div>
    );
};

  

export default Chat;

/* 
style = {
                    {height: 300,
                    width: "30%", 
                    borderColor: "black", 
                    borderWidth: 2, 
                    borderStyle: "solid",
                    display: "flex",
                    flexDirection: "column",
                    }}
                     */

                     /*
                     
                     
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
                    }}  */