import accountReducer from "./accountReducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
    account: accountReducer
})

export default reducers;