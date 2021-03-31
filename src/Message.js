
import React, { useState, forwardRef } from "react";
import './Message.css';
import {Button, FormControl, InputLabel, Input, makeStyles, Card, CardActions, CardContent, Typography} from '@material-ui/core';




const Message = forwardRef(({username, message}, ref) => {

  const isUser = username === message.username;
  return (
    <div ref={ref} className={`message ${isUser && 'message__user'}`}>
      <Card className={isUser ? "message__userCard" : "message__guestCard"}>
        <CardContent>
          <Typography variant="body2" component="p">
            {!isUser && `${message.username || 'Unknown user'}:`} {message.text}
          </Typography>

        </CardContent>
      </Card>
    </div>
  );
})

export default Message;
