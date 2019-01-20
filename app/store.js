import { createStore, applyMiddleware, compose } from 'redux';
import reduxLogger from 'redux-logger';
import rootReducer from './reducers';
import thunk from 'redux-thunk'

const store = createStore(rootReducer, compose(applyMiddleware(thunk, reduxLogger)));

export default store;
