import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import  Icon from 'react-native-vector-icons/Feather';

const SendButton = props => {
    return (
        <TouchableOpacity style={styles.sendButton} onPress={props.onPress}>
            <Icon name="arrow-right" style={styles.arrow}/>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    sendButton: {
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: '#3385ff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    arrow: {
        color: 'white',
        fontSize: 22
    }
});

export default SendButton;
