import React from 'react';

import {BrowserRouter as Router, Route} from 'react-router-dom';
import styles from './App.module.css';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

const App = () => (
    <div className = {styles.bg}>
        <Router>
            <Route path = "/" exact component = {Join}  />
            <Route path = "/chat"  component = {Chat}  />
        </Router>
    </div>
    
)

export default App;