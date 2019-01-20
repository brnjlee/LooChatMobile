import React from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';

const SplashButton = props => {
    return (
        <TouchableOpacity style={props.style? props.style :styles.button} onPress={props.onPress}>
            <Text style={props.style? styles.alt : styles.default}>{props.title}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    alt: {
       color: 'white',
       fontWeight: 'bold'
    },
    default: {
        color: 'black',
        fontWeight: 'bold'
    },
    button: {
        borderColor: 'lightgrey',
        backgroundColor: 'white',
        borderWidth: 1,
        width: 300,
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 20,
        marginBottom: 20
    },
});

export default SplashButton;
