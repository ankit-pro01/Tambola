import React, { Component } from "react";
import "./Game.css"
import {INCREMENT as action_increment} from "../store/actions/counter"

import {connect} from "react-redux";
import Chat from "./chat/chat";



class Game extends Component {

    increment = () => {
        this.props.onIncrement()
    }


    render(){
        return(
            <div className = "game">
                <div className = "tambola">
                    <div>
        <button onClick = {() => this.increment()}>Increment{this.props.count_state}</button>
                    </div>
                </div>
                <div className = "chat">
                    <Chat />
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        count_state : state.Increment.count,
        name : state.user.name
    }
}


const mapStateToDispatch = (dispatch) => {
    return{
        onIncrement : () => dispatch(action_increment())
    }
}
export default connect(mapStateToProps, mapStateToDispatch )(Game);