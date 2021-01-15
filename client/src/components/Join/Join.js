import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import styles from './join.module.css';

/* 
Add proper styling
Add Form Validation and Feedback
*/


const Join = () => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    return (

        <div className = {styles.outerContainer} >
            <div className = {styles.title}>Join</div>
            
            <div className = {styles.inputsContainer} >

            <input className = {styles.input}  type = 'text' placeholder = "Name" onChange = {(event)=> {setName(event.target.value)}} ></input>
            <input className = {styles.input} type = 'text' placeholder = "Room" onChange = {(event)=> {setRoom(event.target.value)}} ></input>
            <Link 
                className = {styles.buttonContainer}
                to ={`/chat/?name=${name}&room=${room} `}
                onClick = {(event) =>( !name || !room) ? event.preventDefault() : null }>
                    <div className= {styles.button}>Join</div>
            </Link>

            </div>
        </div>
          
       

    );

}

    


export default Join;