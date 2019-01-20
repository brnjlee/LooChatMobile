import axios from 'axios';
import * as action from './types';
import { api } from '../config/settings';

export const getConversations = (socket) => dispatch => {
    try{
        axios.get(`${api}/api/messages/get_conversations`)
            .then(res => {
                console.log(`${api}/api/messages/get_conversations`);

                console.log(res);
                const conversations = res.data.conversations.map(conversation => {
                    return conversation[0].conversationId
                });
                socket.emit('enter conversations', conversations);
                dispatch(setConversations(res));
            })
            .catch(err => {
                console.log(`Could not fetch conversations ${err}`)
            })
    } catch(err) {
        console.log(err)
    }

};

export const setConversations = res => {
    return {
        type: action.SET_CONVERSATIONS,
        payload: res.data.conversations
    }
};

export const getConversation = (id) => dispatch => {
    let getConversation = `${api}/api/messages/get_groupConversation/`;
    if(id[0] === '0') {
        getConversation = `${api}/api/messages/get_conversation/`;
    }
    let otherUserId = id.substring(1);
    dispatch({
        type: action.SET_CONVERSATION_LOADER
    });
    dispatch({
        type: action.SET_OTHER_USER_ID,
        payload: otherUserId
    });
    axios.get(getConversation + otherUserId)
        .then(res => {
            console.log(res);
            const conversation = {
                id: res.data.conversationId,
                messages: res.data.conversation
            };
            dispatch({
                type: action.SET_CONVERSATION,
                payload: conversation
            })
        })
        .catch(err => {
            console.log(err)
        })
}


export const newConversation = (recipientId, content) => dispatch => {
    axios.post(`${api}/api/messages/new_conversation/${recipientId}`, {composedMessage: content})
        .then(res => {
            console.log(res);
            axios.get(`${api}/api/messages/get_conversations`)
                .then(res => {
                    dispatch(setConversations(res));
                })
                .catch(err => {
                    console.log(`Could not fetch conversation ${err}`)
                })
        })
        .catch(err => {
            console.log(`Could not create conversation ${err}`)
        })
}

export const sendVideoConversation = (socket, conversation) => dispatch => {
    console.log('sending request');
    socket.emit('request call', conversation);
    dispatch({
        type: action.SEND_VIDEO_CONNECTION,
        payload: conversation.id
    })
}

export const receiveVideoConversation = (conversation) => dispatch => {
    dispatch({
        type: action.RECEIVE_VIDEO_CONNECTION,
        payload: conversation
    })
};

export const confirmVideoConversation = (socket, conversationId) => dispatch => {
    socket.emit('accepted call', (conversationId));

    dispatch({
        type: action.CONFIRM_VIDEO_CONNECTION
    })
};

export const declineVideoConversation = (socket, conversationId) => dispatch => {
    socket.emit('declined call', (conversationId));

    dispatch({
        type: action.DECLINE_VIDEO_CONNECTION
    })
};


