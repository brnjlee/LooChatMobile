import React from 'react';
import {StyleSheet, TouchableOpacity, Image, View, ScrollView, Modal, Alert, TouchableHighlight, Text} from 'react-native';
import { Container, List } from 'native-base';
import {
    getConversations,
    getConversation,
    receiveVideoConversation,
    confirmVideoConversation,
    declineVideoConversation
} from '../../actions/conversation';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Conversation from '../../components/Conversation/Conversation';
import CallModal from '../../components/CallModal/CallModal';

class ConversationList extends React.Component {
    constructor() {
        super();
        this.state = {
            conversations: []
        };
    }

    componentDidMount() {
        console.log(this.props.screenProps.socket);
        this.props.getConversations(this.props.screenProps.socket);

        this.receiveRequestedVideoCall();
    }

    receiveRequestedVideoCall = () => {
        this.props.screenProps.socket.on('request call', conversation => {
            console.log(`recieving call from ${conversation.user.name}`);
            this.props.receiveVideoConversation(conversation);
        })
    };

    acceptCall = () => {
        this.props.confirmVideoConversation(this.props.screenProps.socket, this.props.conversations.videoConversation.conversationId);
        this.navigation.navigate('VideoCall', {
            conversationId: this.props.conversations.videoConversation.conversationId,
            otherUser: null
        });
        console.log('confirmed!')
    }


    render() {
        const { navigate } = this.props.navigation;

        const conversations = this.props.conversations.conversations.map((conversation, i) => {
            console.log(conversation);
            return (<Conversation key={i} title={conversation[1].title[0]}
                                  content={conversation[0].content}
                                  handlePress={() => navigate('ConversationScreen', {
                                      endpointId: conversation[2].endpointId,
                                      otherUser: conversation[1].title[0]
                                  })}
                                      // this.handlePress(conversation[0].conversationId, conversation[1].title[0]._id)}
            />)
        });

        return (
            <Container>
                <ScrollView>
                    {conversations}
                </ScrollView>
                <CallModal
                    show={this.props.conversations.receivingCallRequest}
                    receivingCall={this.props.conversations.videoConversation}
                    accept={() => {
                        this.props.confirmVideoConversation(this.props.screenProps.socket, this.props.conversations.videoConversation.conversationId);
                        navigate('VideoCall', {
                            conversationId: this.props.conversations.videoConversation.conversationId,
                            otherUser: {
                                _id: null
                            }
                        });
                    } }
                    decline={() => this.props.declineVideoConversation(this.props.screenProps.socket, this.props.conversations.videoConversation.conversationId)}
                />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    conversation: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

ConversationList.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    conversations: state.conversations
});

export default connect(
    mapStateToProps, {
        getConversations,
        getConversation,
        receiveVideoConversation,
        confirmVideoConversation,
        declineVideoConversation
    })
(ConversationList);
