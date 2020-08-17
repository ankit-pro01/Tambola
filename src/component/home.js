import React, { useState, useEffect } from "react";

import io from "socket.io-client";

import { useHistory } from 'react-router-dom'




let endPoint = "http://localhost:5000";
let socket = io.connect(`${endPoint}`);


const Home = (props) => {

    const [name, setName] = useState("")
    const [rooms, setRooms] = useState([])
    const [room, setRoom] = useState("")
    const history = useHistory()

    const onNameChange = (e) => {
        setName(e.target.value)
      }

    const addName = () => {
        console.log(name)
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
        console.log(room)

        setRooms([...rooms, room])
      }

      const joinRoom = () => {
          console.log(room)
        if (room !== "") {
          socket.emit("join", {'username': name, 'room': room});
        } else {
          alert("room not exists");
        }
      }

      const handleClick = (props) => {
        history.push('/chat')
      }
    

  return (
    <div className = "Home">
        <p>
            <label>Enter your Name: </label>
            <input value={name} name="name" onChange={e => onNameChange(e)} />
            <button onClick = {() => addName()}>Add</button>
        </p>
        <p>
            <label>Enter Room to join: </label>
            <input value={room} name="room" onChange={e => RoomNameChange(e)} />
            <button  onClick={() => joinRoom()}>join</button>
        </p>

        <p>
            <label>Create new Room: </label><input ></input><button>Create</button>
        </p>
        <p><button onClick = {() => handleClick()}>GO</button></p>


    </div>
      
  )
};

export default Home;

