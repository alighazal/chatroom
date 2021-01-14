import React, {useState} from 'react';
import { Link } from 'react-router-dom';

/* 
Add proper styling
Add Form Validation and Feedback
*/


const Join = () => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    return (
        
        <div>

            <h1>Join</h1>
            <div style = {{display: "flex", flexDirection: "column", width: "35%"}}>

                
                <input type = 'text' placeholder = "name" onChange = {(event)=> {setName(event.target.value)}} ></input>
                <input type = 'text' placeholder = "room" onChange = {(event)=> {setRoom(event.target.value)}} ></input>
                <Link 
                    to ={`/chat/?name=${name}&room=${room} `}
                    onClick = {(event) =>( !name || !room) ? event.preventDefault() : null }>
                    <button type = "submit" style = {{width: "50%"}}> Join </button>
                </Link>
            </div>
          
        </div>

    );

}

    


export default Join;