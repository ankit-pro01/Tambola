import React, { Component } from "react";
import "./cube.css"




class Cube extends Component {



    render(){
        return(
            <div className="cube-container">
                <div id="cube">
                    <figure class="face front">1</figure>
                    <figure class="face back">2</figure>
                    <figure class="face left">3</figure>
                    <figure class="face right">4</figure>
                    <figure class="face top">5</figure>
                    <figure class="face bottom">6</figure>
                </div>
            </div>
        )
    }
}
export default Cube;