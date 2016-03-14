import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { initialState, combinedReducer } from "./Reducers";

const Store = createStore(combinedReducer, initialState, applyMiddleware(ReduxThunk));

export default Store;
