import {combineReducers} from "redux";

import IncrementReducer from "./increment"
import User from "./Users";



const rootReducer = combineReducers({
    user: User,
    Increment : IncrementReducer
})

export default rootReducer;
