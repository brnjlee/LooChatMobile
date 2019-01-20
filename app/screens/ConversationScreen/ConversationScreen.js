import React from 'react';
import {StyleSheet, TouchableOpacity, Image, View, ScrollView, KeyboardAvoidingView} from 'react-native';
import { Container, Text, List } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

import {
    getConversation,
    receiveVideoConversation,
    sendVideoConversation
} from '../../actions/conversation';

import {
    sendMessage,
    addMessage
} from '../../actions/messages';


import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Message from '../../components/Message/Message';
import MessageInput from '../../components/MessageInput/MessageInput';
import SendButton from '../../components/SendButton/SendButton';

let take;

class ConversationScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const title = navigation.getParam('otherUser', 'test').name;
        return {
            headerTitle: title,
            headerRight: (
                <TouchableOpacity
                    onPress={() => {
                        take.requestVideoCall();
                    }}
                    color="blue"
                >
                    <Icon name="video" style={styles.callIcon}/>
                </TouchableOpacity>
            )
        }
    };

    constructor() {
        super();
        this.state = {
            text: '',
        };
    }

    componentDidMount() {
        this.props.getConversation(this.props.navigation.getParam('endpointId', null));
        this.receiveMessage();
        this.receiveRequestedVideoCall();
    }

    /*---------------SOCKET METHODS-----------------*/

    receiveMessage = () => {
        this.props.screenProps.socket.on('new message', payload => {
            // if(payload.conversationId === this.props.conversations.conversation.id) {
                this.props.addMessage(payload.message);
            // }
        })
    };

    receiveRequestedVideoCall = () => {
        this.props.screenProps.socket.on('request call', conversation => {
            console.log(`recieving call from ${conversation.user.name}`);
            this.props.receiveVideoConversation(conversation);
        })
    };




    /*----------------------------------------------*/

    requestVideoCall = () => {
        const conversation = {
            id: this.props.conversations.conversation.id,
            user: this.props.auth.user
        };
        this.props.sendVideoConversation(this.props.screenProps.socket, conversation);
        this.props.navigation.navigate('VideoCall', {
            conversationId: this.props.conversations.conversation.id,
            otherUser: this.props.navigation.getParam('otherUser', null)
        });
    }


    sendHandler = () => {
        this.props.sendMessage(this.state.text, this.props.conversations.conversation.id, this.props.auth.user.id, this.props.screenProps.socket);
        this.setState({text: ''});
    }

    render() {
        take = this;
        const { navigate } = this.props.navigation;
        const conversation = this.props.conversations.conversation.messages.map((message, i) => {
            return (
                <Message key={i} fromUser={message.author._id === this.props.auth.user.id}>{message.content}</Message>
            )
        });
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
            >
                <ScrollView
                    ref={ref => this.scrollView = ref}
                    style={{flex: 1}}
                    onContentSizeChange={() => {
                        this.scrollView.scrollToEnd({animated: true});
                    }}
                >
                    {conversation}
                </ScrollView>
                <View style={styles.inputContainer}>
                    <MessageInput handleTextChange={(text) => {this.setState({ text })}} val={this.state.text}/>
                    <SendButton onPress={this.sendHandler}/>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white'
    },
    inputContainer: {
        minHeight: 50,
        borderTopWidth: 1,
        borderTopColor: '#e6e6e6',
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: 130
    },
    callIcon: {
        fontSize: 20,
        marginRight: 10,
    }
});

ConversationScreen.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    conversations: state.conversations
});

export default connect(
    mapStateToProps, {
        getConversation,
        sendMessage,
        addMessage,
        receiveVideoConversation,
        sendVideoConversation
    })
(ConversationScreen);
