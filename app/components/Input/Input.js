import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const Input = props => {
    return (
        <TextInput
            style={styles.input}
            secureTextEntry={props.isSecure}
            onChangeText={props.setText}
        >
        </TextInput>
    )
};

const styles = StyleSheet.create({
    input: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'lightgrey',
        fontSize: 20,
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop:10,
        paddingBottom: 10,
        marginBottom: 10,
        color: 'black',
    }
});

export default Input;
