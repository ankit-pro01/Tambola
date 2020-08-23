const InitialState = {
    count : 0
}

const IncrementReducer = (state = InitialState, action) => {
    switch (action.type) {
        case "INCREMENT":
            console.log("inside Increment reducer")
            return{
                ...state,
                count : state.count + 1
            }
    
        default:
            return{...state}
    }
}

export default IncrementReducer;