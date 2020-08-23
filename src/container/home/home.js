import React, { Component } from "react";
import "./home.css"

import io from "socket.io-client";

let endPoint = "http://localhost:5000";
let socket = io.connect(`${endPoint}`);



class Home extends Component {


    addName = () => {
    }

    sendMessage = () => {}

    render(){
        return(
            <div className = "home">
                <h1>Welcome to Tambola APP</h1>
                <div>
                    <p><input></input><button onClick = {() => this.addName()}>ADD</button></p>
                    <p><input></input><button>join room</button></p>
                    <p><input></input><button>create Room</button></p>
                </div>
            </div>
        )
    }
}

export default Home;