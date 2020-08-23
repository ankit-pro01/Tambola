import React, { Component } from "react";
import io from "socket.io-client";

let endPoint = "http://localhost:5000";
let socket = io.connect(`${endPoint}`);


// import "./Game.css"

class Chat extends Component {
    state = {
        message: "",
        messages: []
    }

    OnTextChange = (e) => {
        this.setState({...this.state, message : e.target.value})
    }

    componentDidMount(){
        // socket.on('connect', () => {
        //     socket.send("server connected")
        // })
        socket.on("message", (msg) => {
            console.log(msg)
            this.setState({...this.state, messages : [...this.state.messages, msg]})
        })
    }

    onSendMessage = () => {
        console.log(this.state.message)
        socket.send(this.state.message)
    }

    render(){
        return(
            <div className = "chat">
                <p>Hi</p>
                <div>
                    {this.state.messages.map(msg => {
                        return(
                        <p>{msg}</p>
                        )
                    })}
                </div>
                <p><input onChange = {(e) => this.OnTextChange(e)}></input><button onClick = {this.onSendMessage}>Send</button></p>
            </div>

        )
    }
}

export default Chat