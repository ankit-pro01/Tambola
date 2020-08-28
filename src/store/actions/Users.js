export const Users = (user_name) => {
    return{
        type: "ADD_USER",
        name : user_name
    }
}


export const joinRoom = (room_name) => {
    return{
        type: "JOIN_ROOM",
        room : room_name
    }
}