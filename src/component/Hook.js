import React, {useState} from "react"

function Counter(){

    const [name, setname] = useState({'firstname': "", 'lastname' : ""})
    return(
        <div>
            <label>Firstname:</label>
            <input 
            type= "text" 
            value= {name.firstname} 
            onChange = {(e) => setname({...name, firstname : e.target.value})}/>

            <label>Lastname:</label>
            <input 
            type = "text" 
            value = {name.lastname}
            onChange = {(e) => setname({...name, lastname : e.target.value})} />

            <p>Your First name is : {name.firstname}</p>
            <p> Youar lastname is : {name.lastname}</p>
            
        </div>
    )
} 

export default Counter