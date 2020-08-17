import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import io from "socket.io-client";
import Game from "./component/game";
import "./app.css"

import Home from "./component/home";
import Chat from "./component/chat";


let endPoint = "http://localhost:5000";
let socket = io.connect(`${endPoint}`);

const App = () => {
  const [messages, setMessages] = useState(["Hello And Welcome"]);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("")
  const [rooms, setRooms] = useState([])
  const [room, setRoom] = useState("")



  useEffect(() => {
    getName();
    getMessages();
  }, [messages.length, name]);


  const getName = () => {
    socket.on("name", name => {
      console.log(name)
    })
  }

  const getMessages = () => {
    socket.on("message", msg => {
      setMessages([...messages, msg]);
    });
  };

  const onNameChange = (e) => {
    setName(e.target.value)
  }

  // On Change
  const onChange = e => {
    setMessage(e.target.value);
  };

  // On Click
  const onClick = () => {
    if (message !== "") {
      let data = {"message" : name + " : " + message, "room": room } 
      socket.emit("message", data);
      setMessage("");
    } else {
      alert("Please Add A Message");
    }
  };

  const addName = () => {
    if (name !== "") {
      socket.emit("name", name);
    } else {
      alert("Please Add A Name");
    }
  };


  const RoomNameChange = (e) => {
    setRoom(e.target.value)
  }

  const addRoom = () => {
    setMessages([...rooms, room])
  }


  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join", {'username': name, 'room': room});
    } else {
      alert("room not exists");
    }
  }

  const [data, setData] = useState({ name : "", room : ""})

  return (
    <div className = "App">
      <Router>
      <Switch>
          <Route exact path="/">
            <Home />
          </Route >

          <Route path = "/chat" >
            <Chat data = {data}/>
          </Route>

      </Switch>

      </Router>
  

      {/* <div className = "game">
          <Game />
          <input value={room} name="room" onChange={e => RoomNameChange(e)} />
          <button  onClick={() => joinRoom()}>join</button>
      </div>
      <div className = "chat"  style ={{textAlign: "center"}}>
        <div><b>CHAT</b></div>
          <div>
          Name : <input value={name} name="message" onChange={e => onNameChange(e)} />
          <button onClick = {() => addName()}>Add</button>
          </div>
          {messages.length > 0 &&
            messages.map(msg => (
              <div>
                <p>{msg}</p>
              </div>
            ))}
          <input value={message} name="message" onChange={e => onChange(e)} />
          <button onClick={() => onClick()}>Send Message</button>
      </div> */}


    </div>
      
  )
};

export default App;

