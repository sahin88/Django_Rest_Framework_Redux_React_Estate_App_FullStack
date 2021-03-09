import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";

const rootReducers = combineReducers({ auth });
export default rootReducers;
