import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from "./reducers";
import {socketMiddleware} from "./middleware/socketMiddleware";
import thunkMiddleware from 'redux-thunk';
export const store = createStore(rootReducer,
    compose(applyMiddleware(thunkMiddleware, socketMiddleware())),
);