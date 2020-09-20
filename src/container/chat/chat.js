import React, { Component } from "react";
import io from "socket.io-client";

import {connect} from "react-redux"
import "./chat.css";
import Picker from 'emoji-picker-react';
import Ghost from '../animated/ghost'

import Writing from "../animated/writing"

let img = require("../../assets/chat.svg")
let new_img = require("../../assets/celebrate.png")



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
        king : false,
        showModal : false,
        showClaim : false,
        claimer : "",
        room_id : "",
        start :  false
    }

    OnTextChange = (e) => {
        this.setState({...this.state, message : e.target.value})
    }

    componentDidMount(){

        socket.on("king", data => {
            let king = data.king
            let room_id = data.room_id
            console.log("king: ", king)
            this.setState({...this.state, king : king, room_id : room_id})

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
            this.setState({...this.state, hostNumber : [...this.state.hostNumber, data.msg], start : true})
        })

        socket.on('claim', (data) => {
            console.log("claim ->", data.msg)
            if(data.msg === "YES"){
                this.setState({...this.state, showClaim : false, claimer: data.claimer})
                this.openModal()

            }
            else{
                this.setState({...this.state, showClaim : true, claimer: data.claimer})
            }
        })

        socket.on('playAgain', (data) => {
            console.log(data.msg)
            clearInterval(global_var)
            this.setState({...this.state, hostNumber : [], start: false})
            socket.emit('chits')
        })
    }

    onSendMessage = () => {
        console.log(this.props.room)
//        socket.emit('join', {'name' : this.props.name, 'room' : this.props.room})
        socket.send({ 'msg' : this.state.message, 'name' :  this.props.name, 'room' : this.props.room})
    }

    stop = () => {
        console.log("inside stop")
        console.log(this.state.chit)
        clearInterval(global_var)
        console.log("room is :",this.props.room)
        socket.emit('claim', {'room' : this.props.room, 'number_list' : this.state.chit, 'claimer': this.props.name})



    }

    openModal = () =>{
        this.setState({...this.state, showModal : !this.state.showModal})
        console.log(this.state.showModal)
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
        document.getElementById('chit_button').disabled = 'true'
    }

    playAgain = () => {
        this.setState({...this.state, hostNumber: [], })
        socket.emit('playAgain', {'room': this.props.room})
        this.openModal()
        let z = document.getElementsByClassName("chit_numbers")

        for(let i = 0; i < z.length;i++){
            z[i].style.backgroundColor = 'white'
            z[i].style.textDecoration = 'none'
        }
        

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
                
                    {
                    this.state.showModal ?  
                    <div id="myModal" className="modal">
                        <div className="modal-content">
                            <span onClick = {this.openModal}className="close">&times;</span>
                            <div>        
                                <div className = "Ghost">
                                    <Ghost />   
                                </div> 
                                <div>
                                <h1>CONGRATS</h1>
                                <p>{this.state.claimer} is the winner</p>
                                <button style = {{backgroundColor: "#523160", color : "white", padding: "5px"}} onClick = {this.playAgain}>play again</button>
                                </div>      
                                
                            </div>
                    }
                    </div>

                </div> : ""
                    }
                       
                <div style = {{margin: "50px"}}>  
                    <button className = "number-generator">{this.state.hostNumber[this.state.hostNumber.length - 1]}</button>
                    {this.state.start  ? <p style = {{color : "#523160"}}>Match has been Started</p> : null}
                </div>

                {this.state.showClaim ? <p>{this.state.claimer} claims to be winner</p>: null}

                <div><button onClick = {this.stop}>CLAIM</button></div>
                    
                <p><button onClick = {this.getChit} id = "chit_button">chit</button></p>
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
                <div style= {{textAlign: "center"}}>
                    <h2>CHAT ROOM</h2>
                    <h4>Hi {this.props.name}</h4>
                    <p>ROOM ID : {this.state.room_id}</p>
                </div>
                
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

                 <div className = "chatImage">
                        <img src = {img}  width = "360px"/>
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
