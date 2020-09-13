import React, { Component } from "react";
import io from "socket.io-client";

import {connect} from "react-redux"
import "./chat.css";
import Picker from 'emoji-picker-react';



let endPoint = "http://localhost:5000";
export const socket = io.connect(`${endPoint}`);


let global_var
    
class Chat extends Component {
    state = {
        message: "",
        messages: [],
        chit:[],
        hostNumber : [],
        chosenEmoji : "",
        king : false
    }

    OnTextChange = (e) => {
        this.setState({...this.state, message : e.target.value})
    }

    componentDidMount(){

        socket.on("king", data => {
            let king = data.king

            console.log("king: ", king)
            this.setState({...this.state, king : king})

        })

        socket.on("join", data => {
            let msg  = data.msg
            this.setState({...this.state, messages : [...this.state.messages, msg]})

        })
        socket.on("message", (data) => {
            console.log(data)
            let msg  = data.username + " : " + data.msg
            this.setState({...this.state, messages : [...this.state.messages, msg]})
            

        })

        socket.on('chits', (data) => {
            console.log(data)
            this.setState({...this.state, chit : data.chit})
        })

        socket.on('start', (data) => {
            console.log("start", data.msg)
            this.setState({...this.state, hostNumber : [...this.state.hostNumber, data.msg]})
        })
    }

    onSendMessage = () => {
        console.log(this.props.room)
//        socket.emit('join', {'name' : this.props.name, 'room' : this.props.room})
        socket.send({ 'msg' : this.state.message, 'name' :  this.props.name, 'room' : this.props.room})
    }

    stop = () => {
        console.log("inside stop")
        clearInterval(global_var)
    }

    start = () => {
        console.log("emited")        
        socket.emit('start', {'room' : this.props.room})
    }

    onStart = () => {
        global_var = setInterval(this.start, 3600);
    }

    getChit = () => {
        socket.emit('chits')
    }

    changeColor = (e) => {
        console.log(e.target.id)
        let id = e.target.id
        console.log(document.getElementById(id).style.backgroundColor == 'white')
        if (document.getElementById(id).style.backgroundColor == 'white'){
            document.getElementById(id).style.textDecoration = "line-through"
            document.getElementById(id).style.backgroundColor = "Red"   
        }
        else{
            document.getElementById(id).style.backgroundColor = 'white'
            document.getElementById(id).style.textDecoration = "none"

        }
    }

    onEmojiClick = (event, emojiObject) => {
        this.setState({...this.state, chosenEmoji : emojiObject, message : this.state.message + emojiObject.emoji})

        let value = document.getElementById('inputText').value
        document.getElementById('inputText').value = this.state.message
        
      };


    openEmoji = () => {
        if (document.getElementById('emoji').style.display == 'none'){
            document.getElementById('emoji').style.display ='Block'
        }
        else{
            document.getElementById('emoji').style.display ='none'

        }

    }

    render(){
        console.log(" Number is : ", this.state.hostNumber)
        return(
            <div className = "game">
                <div className = "tambola">
                    <div className = "modal">
                        PLAY AGAIN
                    </div>
                <div style = {{margin: "50px"}}>  
                    <button className = "number-generator">{this.state.hostNumber[this.state.hostNumber.length - 1]}</button>
                </div>

                <div><button onClick = {this.stop}>CLAIM</button></div>
                    
                <p><button onClick = {this.getChit}>chit</button></p>
                {this.state.king ? <p><button onClick = {this.onStart}>Start</button></p> : ""}
                <div className = "chit">
                    <div>
                    {this.state.chit.map(num => {
                        console.log(this.state.chit.indexOf(num))
                        return(
                        <button id = {"id" + this.state.chit.indexOf(num)} className = "chit_numbers" onClick = {(e) => this.changeColor(e)}>{num}</button>
                        )
                    })}
                    </div>
                       
                </div>
            </div>
            <div className = "chat">
                <p style= {{textAlign: "center"}}>
                    <h2>CHAT ROOM</h2>
                    <h4>Hi {this.props.name}</h4>
                </p>
                
                <div>
                    {this.state.messages.map(msg => {
                        return(
                        <p className = "chat-container">{msg}</p>
                        )
                    })}
                </div>

                <p className = "Send-Message"><input id = "inputText" onChange = {(e) => this.OnTextChange(e)}></input>
                <span onClick = {this.openEmoji}>emoji</span>
                <button onClick = {this.onSendMessage}>Send</button></p>
                <div>
                <div id = "emoji" style = {{display: "none"}}>
                   <Picker onEmojiClick={this.onEmojiClick} />
                    </div>
                 </div>
      
            </div>

        </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        count_state : state.Increment.count,
        name : state.user.name,
        room : state.user.room
    }
}

export default connect(mapStateToProps)(Chat)
