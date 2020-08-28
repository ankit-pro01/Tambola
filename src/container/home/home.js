import React, { Component } from "react";
import "./home.css"

import {connect} from "react-redux";

import {Users as UserAction, joinRoom } from "../../store/actions/Users"

class Home extends Component {

    state = {
        user_name: "",
        join_room : "",
        create_room : "",
        Users : [],
        Rooms : []
    }


    addName = () => {
        console.log("name: ", this.state.name)
        this.props.UserAdd(this.state.name)
    }

    RedirectPage = () => {
        this.props.history.push('/game')
    }

    onNameChange = (e) => {
        this.setState({...this.state, name : e.target.value})
    }

    onRoomChange = (e) => {
        this.setState({...this.state, room : e.target.value})
    }

    onCreateRoomChange = (e) =>{
        this.setState({...this.state, new_room : e.target.value})
    }

    onCreateRoom = () =>{
        console.log("room is created")
    }

    joinRoom = () => {
        this.props.joinRoom(this.state.room)
    }

    render(){
        return(
            <div className = "home">
                <h1>Welcome to Tambola APP</h1>
                <div>
                    <p><input onChange = {(e) => this.onNameChange(e)}></input><button onClick = {() => this.addName()}>Name</button></p>
                    <p><input onChange = {(e) => this.onRoomChange(e)}></input><button onClick = {this.joinRoom}>join room</button></p>
                    <p><input onChange = {(e) => this.onCreateRoomChange(e)}></input><button>create Room</button></p>
                    <p><button onClick = {this.RedirectPage}>play</button></p>
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