import React, { useState, useEffect } from "react";

import io from "socket.io-client";


let endPoint = "http://localhost:5000";
let socket = io.connect(`${endPoint}`);



const Chat = (props) => {
  const [messages, setMessages] = useState(["Hello And Welcome"]);
  const [message, setMessage] = useState("");
  const [data, setData] = useState({})


 
  useEffect(() => {
    getData();
    getMessages();
  }, [messages.length]);


  const getData = () => {
    //   setData({...data}, props.data)
      console.log(props.data);
  }
  const getMessages = () => {
    socket.on("message", msg => {
      setMessages([...messages, msg]);
    });
  };


  // On Change
  const onChange = e => {
    setMessage(e.target.value);
  };

  // On Click
  const onClick = () => {
    if (message !== "") {
      let data = {"message" : data["name"] + " : " + message, "room": data["room"] } 
      socket.emit("message", data);
      setMessage("");
    } else {
      alert("Please Add A Message");
    }
  };



  return (
    <div className = "Chat">
      <div className = "chat"  style ={{textAlign: "center"}}>
        <div><b>CHAT</b></div>
          {messages.length > 0 &&
            messages.map(msg => (
              <div>
                <p>{msg}</p>
              </div>
            ))}
          <input value={message} name="message" onChange={e => onChange(e)} />
          <button onClick={() => onClick()}>Send Message</button>
      </div>
    </div>
      
  )
};

export default Chat;

