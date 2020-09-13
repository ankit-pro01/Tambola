const InitialState = {
    name : "",
    room: ""
}

const UsersReducer = (state = InitialState, action) => {
    switch (action.type) {
        case "ADD_USER":
            console.log("inside name reducer")
            return{
                ...state,
                name : action.name
            }
        case "JOIN_ROOM":
            console.log("inside join Room")
            
            return{
                ...state,
                room : action.room
            }
    
        default:
            return{...state}
    }
}

export default UsersReducer;