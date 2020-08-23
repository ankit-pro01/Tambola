import React, { Component } from "react";

import "./app.css"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Game from "./container/Game";
import Home from "./container/home/home";






class App extends Component {
    state = {
        flag: false
    }

    render(){
        return(
            <BrowserRouter>
            <Switch>
                <Route path = "/game" component = {Game} />
                <Route exact path = "/" component = {Home} />
            </Switch>
            </BrowserRouter>
        )
    }
}

export default App;