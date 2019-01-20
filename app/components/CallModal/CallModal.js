import React from 'react';
import {StyleSheet, View, Text, Image, Modal, Alert, TouchableOpacity} from 'react-native';
import  Icon  from 'react-native-vector-icons/MaterialIcons';

const CallModal = props => {
    return (
        <Modal
            animationType="fade"
            transparent={false}
            visible={props.show}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
            }}
        >
            <View style={styles.callModal}>
                <View style={styles.topContainer}>
                    <Image
                        style={styles.avatar}
                        source={{uri: `https:${props.receivingCall.from.avatar}`}}
                    />
                    <Text style={styles.name}>{props.receivingCall.from.name}</Text>
                    <Text style={styles.description}>Video Call</Text>
                </View>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                        style={styles.option}
                        onPress={props.accept}
                    >
                        <Icon name="call" style={styles.accept}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.option}
                        onPress={props.decline}
                    >
                        <Icon name="call-end" style={styles.decline}/>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    callModal: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'grey',
        flex: 1
    },
    topContainer: {
        alignItems: 'center'
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    name: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    },
    description: {
        fontSize: 15,
        fontWeight: "100",
        color: 'white'
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'stretch'
    },
    option: {
        width: 60,
        height: 60,
        borderRadius: 35,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    accept: {
        color: 'green',
        fontSize: 30
    },
    decline: {
        color: 'red',
        fontSize: 30
    }
});

export default CallModal;
