import React, { Component } from "react";
import "./home.css"

import {connect} from "react-redux";

import {Users as UserAction, joinRoom } from "../../store/actions/Users";

import {socket} from "../chat/chat";


const poster = require( "../../assets/some.svg")

class Home extends Component {

    state = {
        user_name: "",
        join_room : "",
        create_room : "",
        Users : [],
        Rooms : [],
        join : false,
        create: false,
        error : "",
    }

    componentDidMount(){
        console.log("inside componrent did mount");
        socket.on('join', (data) => {
            let error = data['error']
            if (error == ""){
                console.log("joining")
                this.props.history.push('/game')
            }
            else{
                this.setState({...this.state, error : error})
                console.log("error")
            }
        })
        
    }

    RedirectPage =  () => {
        this.props.UserAdd(this.state.name) 
        this.props.joinRoom(this.state.room)
        if(this.state.create){
            socket.emit('newRoom', {'name' : this.state.name, 'room' : this.state.room})

        }
        else{
            socket.emit('join', {'name' : this.state.name, 'room' : this.state.room})

        }
       
    }

    onNameChange = (e) => {
        this.setState({...this.state, name : e.target.value})
    }

    onRoomChange = (e) => {
        this.setState({...this.state, room : e.target.value})
    }

    onCreateRoomChange = (e) =>{
        this.setState({...this.state, room : e.target.value})
    }

    onCreateRoom = () =>{
        this.setState({...this.state, create : true, join : false})
        console.log("room is created")

    }

    onJoinRoom = () => {
        this.setState({...this.state, create : false, join : true})
        console.log("join room")
    }


    render(){
        return(
            <div className = "homeContainer">
                {/* <div className = "poster">
                    <img src = {poster}></img>
                </div> */}
                <div className = "home">
                <h1>Welcome to Tambola APP</h1>
                <div>
                    <p>NAME : <input onChange = {(e) => this.onNameChange(e)}></input></p>
                    {
                       this.state.join ?<p> enter room name<input onChange = {(e) => this.onRoomChange(e)} 
                       /></p> : ""
                    }
                    {
                        this.state.create ?<p> create room <input onChange = {(e) => this.onCreateRoomChange(e)} /></p>  : ""
                    }
                 
                     <button onClick = {this.onJoinRoom}>JOIN ROOM</button>
                    <button onClick = {this.onCreateRoom}>CREATE ROOM</button>

                    <p><button onClick = {this.RedirectPage}>play</button></p>

                <p>{this.state.error}</p>
                </div>
            </div>

            </div>
            
        )
    }
}

const mapStateToDispatch = (dispatch) => {
    return {
        UserAdd : (user_name) =>  dispatch(UserAction(user_name)),
        joinRoom : (room_name) => dispatch(joinRoom(room_name))
    }
}
export default connect( null ,mapStateToDispatch)(Home);