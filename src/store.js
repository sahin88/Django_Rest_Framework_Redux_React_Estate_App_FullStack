import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducers from "./reducers/index";
import Auth from "./reducers/auth";

const initialState = {};
const middleWare = ["thunk"];

const store = createStore(
  Auth,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
