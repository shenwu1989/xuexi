import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(
    reducer,
    // composeEnhancers(
    applyMiddleware(thunk, promise, logger)
    // )
);

export default store; 