
import React, { useState, useEffect, forwardRef } from "react";
import FlipMove from 'react-flip-move';
import './App.css';
import Message from './Message.js'
import {Button, FormControl, InputLabel, Input} from '@material-ui/core';
import db from './firebase.js';
import firebase from 'firebase';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';


function App() {

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [userName, setUsername] = useState('');

  useEffect(() => {
    //runs on every change in db
    db.collection('messages').onSnapshot( snapshot => {
      // iterates trough data and return the objects
      setMessages((snapshot.docs.map(doc => ({id: doc.id, message: doc.data()}))).sort((a, b) => {
      return b.message.time - a.message.time;
    }))
    })

  }, [])

  useEffect(() => {
    setUsername(prompt('Please enter your name'));
  }, [])


  const sendMessage = (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    db.collection('messages').add({
      username: userName,
      text: input,
      time: firebase.firestore.FieldValue.serverTimestamp() // for handling timezone
    });
    setInput('');
  }
  return (
    <div className="App">
      <img className="app_logoImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/1200px-Facebook_Messenger_logo_2020.svg.png" />
      <h1> Welcome to the chat {userName}</h1>
      <form className="app__form">
          <FormControl className="app__formControl">
              <Input className="app__input"value={input} onChange={event => setInput(event.target.value)} placeholder='Enter a message'/>
              <IconButton className="app__iconButton" type='submit' disabled={!input} onClick={sendMessage} variant="contained" color="primary">
                  <SendIcon />
              </IconButton>
          </FormControl>
      </form>
      <FlipMove class="app__flipMove">
        {
          messages.map(({id, message}) => (
            <Message key={id} username={userName} message={message}/>
          ))
        }
      </FlipMove>
      <div className="dummy"> </div>
    </div>
  );
}

export default App;
