import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import PropTypes from 'prop-types';
import Peer from 'simple-peer';
import {
    RTCView,
    getUserMedia,
} from 'react-native-webrtc';
const WebRTC = require('react-native-webrtc');

import { connect } from 'react-redux';

class VideoCall extends Component {
    constructor() {
        super();
        this.state = {
            errors: {},
            hasMedia: false,
            muted: false,
            requestInProgress: true,
            localStream: null,
            localStreamURL: null,
            remoteStream: null,
            remoteStreamURL: null,
            data: null,
        }
        this.peers = {};
        this.conversationId = null;
        this.otherUserId = null;
        this.setupMedia();
    }

    componentDidMount() {
        // if(this.otherUserId) {
        //     this.setState({requestInProgress: true})
        // }
        this.conversationId = this.props.navigation.getParam('conversationId', null);
        this.otherUserId = this.props.navigation.getParam('otherUser', null)._id;

        this.receiveSignal();
        this.acceptedCall();
        this.declinedCall();
    }

    setupMedia = () => {
        getUserMedia({
                audio: true,
                video: {
                    mandatory: {
                        minWidth: 500, // Provide your own width, height and frame rate here
                        minHeight: 300,
                        minFrameRate: 30
                    },
                    facingMode: 'user',
                },
            },
            (stream => {
                this.setState({
                    localStream: stream,
                    localStreamURL: stream.toURL(),
                })
            }),
            (error => console.error(`getUserMedia failed with error: ${error}`)),
        );
    }

    componentWillUnmount() {
        console.log('component unmounted');
        this.removeSignalListener();
    }

    /*---------------SOCKET METHODS-----------------*/

    receiveSignal = () => {
        this.props.screenProps.socket.on('client-signal', signal => {
            if(signal.conversation === this.conversationId){
                console.log(this.peers);
                let peer = this.peers[signal.userId];
                if (peer === undefined) {
                    peer = this.startPeer(signal.userId, false);
                    console.log(this.peers);
                }
                peer.signal(signal.data);
                this.peers[signal.userId] = peer;
            }
        })
    };

    acceptedCall = () => {
        this.props.screenProps.socket.on('accepted call', () => {
            this.setState({requestInProgress: false});
            console.log(`start call with ${this.otherUserId}`);
            if(this.otherUserId !== null) {
                this.peers[this.otherUserId] = this.startPeer(this.otherUserId, true);
            }
        });
    };

    declinedCall = () => {
        this.props.screenProps.socket.on('declined call', () => {
            console.log('declined call');
            this.props.navigation.dispatch(NavigationActions.back());
        })
    }

    removeSignalListener = () => {
        this.props.screenProps.socket.removeListener('client-signal');
        this.props.screenProps.socket.removeListener('accepted call');
    };
    /*----------------------------------------------*/

    startPeer = (signalUserId, initiator = true) => {
        const peer = new Peer({
            initiator,
            stream: this.state.localStream,
            trickle: false,
            wrtc: WebRTC,
            // config: {
            //     iceTransportPolicy: "relay",
            //     iceServers: [
            //         { urls: "stun:stun.l.google.com:19302" },
            //         { urls: "stun:global.stun.twilio.com:3478?transport=udp" }
            //     ]
            // }
        });
        console.log(peer);

        peer.on('signal', data => {
                console.log(data);
                const signal = {
                    type: 'signal',
                    userId: this.props.auth.user.id,
                    conversation: this.conversationId,
                    data: data
                };

                this.props.screenProps.socket.emit(`client-signal`, (signal));
            }
        );

        peer.on('stream', (stream) => {
            console.log("receiving stream");
            this.setState({
                remoteStream: stream,
                remoteStreamURL: stream.toURL()
            });
        });

        peer.on('connect', () => {
            console.log('Peer connected')
        });

        peer.on('close', () => {
            console.log('connection closed');
            let peer = this.peers[this.props.auth.user.id];
            if(peer !== undefined) {
                peer.destroy();
            }
            this.peers[this.props.auth.user.id] = undefined;
        });

        return peer;
    };


    endCall = () => {

    }

    toggleAudio = () => {
    }


    render() {
        return (
           <View>
               <Text>Local stream: {this.state.localStreamURL}</Text>
               {this.state.requestInProgress? <Text>Waiting</Text>:<Text>Accepted</Text> }
               <RTCView streamURL={this.state.localStreamURL} style={styles.myVideo}/>
               <RTCView streamURL={this.state.remoteStreamURL} style={styles.userVideo}/>
           </View>
        );
    }
}

const styles = StyleSheet.create({
    myVideo: {
        width: 200,
        height: 400,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'black',
    },
    userVideo: {
        width: 200,
        height:400,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'black',
    }
})

VideoCall.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
})

export default connect(
    mapStateToProps,
    {
    }
)(VideoCall)
