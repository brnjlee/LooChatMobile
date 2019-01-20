import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import conversationReducer from './conversationReducer';

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    conversations: conversationReducer
});
