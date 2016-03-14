import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import { initialState, combinedReducer } from "./Reducers";

const Store = createStore(combinedReducer, initialState,
  compose(applyMiddleware(ReduxThunk),
    window.devToolsExtension ? window.devToolsExtension() : undefined));

export default Store;
