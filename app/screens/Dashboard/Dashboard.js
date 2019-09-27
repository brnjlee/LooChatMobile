// import React from 'react';
// import {StyleSheet, View, Text} from 'react-native';
//
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { logoutUser } from '../../actions/authentication';
//
// import NavigationService from '../../NavigationService';
//
// class Dashboard extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//         }
//     }
//
//     render() {
//         console.log(this.props);
//         return (
//             <View>
//                 <Text>
//                     testing
//                 </Text>
//             </View>
//         );
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#ffffff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     }
// });
//
// Dashboard.propTypes = {
//     logoutUser: PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired
// }
//
// const mapStateToProps = (state) => ({
//     auth: state.auth
// })
//
// export default connect(mapStateToProps, { logoutUser })(Dashboard);

//
// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */
//
// import React, { Component } from 'react';
// import {
//     StyleSheet,
//     Button,
//     Text,
//     View
// } from 'react-native';
//
// import wrtc from 'react-native-webrtc'
//
// // Uncomment the 2nd import to use the locally patched version of simple-peer
// import Peer from 'simple-peer'
// //import Peer from './simple-peer'
//
// export default class Dashboard extends Component<{}> {
//     state = { status: '', message: '' }
//
//     connect = () => {
//         this.setState({ status: 'Connecting...' })
//         var peer1 = new Peer({ initiator: true, wrtc: wrtc })
//         var peer2 = new Peer({ wrtc: wrtc })
//
//         peer1.on('signal', (data) => {
//             // when peer1 has signaling data, give it to peer2 somehow
//             console.log('Peer1: signal')
//             peer2.signal(data)
//         })
//
//         peer2.on('signal', (data) => {
//             // when peer2 has signaling data, give it to peer1 somehow
//             console.log('Peer2: signal')
//             this.setState({ status: 'Received signaling data' })
//             peer1.signal(data)
//         })
//
//         peer1.on('connect', () => {
//             // wait for 'connect' event before using the data channel
//             console.log('Peer1: connect')
//             peer1.send('hey peer2, how is it going?')
//         })
//
//         peer2.on('connect', () => {
//             console.log('Peer2: connect')
//             this.setState({ status: 'Connected' })
//         })
//
//         peer2.on('data', (data) => {
//             // got a data channel message
//             console.log('got a message from peer1: ' + data)
//             this.setState({ message: data.toString() })
//         })
//     }
//
//     render() {
//         const { status, message } = this.state
//
//         return (
//             <View style={styles.container}>
//                 <Button title='Connect' onPress={this.connect} />
//                 <Text style={styles.welcome}>Status:</Text>
//                 <Text style={styles.instructions}>{status}</Text>
//                 <Text style={styles.welcome}>Message:</Text>
//                 <Text style={styles.instructions}>{message}</Text>
//             </View>
//         );
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF',
//     },
//     welcome: {
//         fontSize: 20,
//         textAlign: 'center',
//         margin: 10,
//     },
//     instructions: {
//         textAlign: 'center',
//         color: '#333333',
//         marginBottom: 5,
//     },
// });


import React, { Component } from 'react';
// import { Platform } from 'react-native';
import {
    RTCPeerConnection,
    RTCMediaStream,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStreamTrack,
    getUserMedia,
} from 'react-native-webrtc';

class Dashboard extends Component {
    // Initial state
    state = {
        videoURL: null,
        isFront: true
    }

    componentDidMount() {
        const configuration = { "iceServers": [{ "url": "stun:stun.l.google.com:19302" }] };
        const pc = new RTCPeerConnection(configuration);
        const { isFront } = this.state;
        MediaStreamTrack.getSources(sourceInfos => {
            console.log('MediaStreamTrack.getSources', sourceInfos);
            let videoSourceId;
            for (let i = 0; i < sourceInfos.length; i++) {
                const sourceInfo = sourceInfos[i];
                // I like ' than "
                if (sourceInfo.kind === 'video' && sourceInfo.facing === (isFront ? 'front' : 'back')) {
                    videoSourceId = sourceInfo.id;
                }
            }
            getUserMedia({
                audio: true,
                video: {
                    mandatory: {
                        minWidth: 500,
                        minHeight: 300,
                        minFrameRate: 30
                    },
                    facingMode: (isFront ? 'user' : 'environment'),
                    optional: (videoSourceId ? [{ sourceId: videoSourceId }] : [])
                }
            }, (stream) => {
                console.log('Streaming OK', stream);
                this.setState({
                    videoURL: stream.toURL()
                });
                pc.addStream(stream);
            }, error => {
                console.log('Oops, we getting error', error.message);
                throw error;
            });
        });
        pc.createOffer((desc) => {
            pc.setLocalDescription(desc, () => {
                // Send pc.localDescription to peer
                console.log('pc.setLocalDescription');
            }, (e) => { throw e; });
        }, (e) => { throw e; });

        pc.onicecandidate = (event) => {
            // send event.candidate to peer
            console.log('onicecandidate', event);
        };

    }

    render() {
        return (
            <RTCView streamURL={this.state.videoURL} style={styles.container} />
        );
    }
}
const styles = {
    container: {
        flex: 1,
        backgroundColor: '#ccc',
        borderWidth: 1,
        borderColor: '#000'
    }
};

export default Dashboard;
