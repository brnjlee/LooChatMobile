import React from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, TextInput } from 'react-native';



export default class MessageInput extends React.Component {
    constructor() {
        super();
        this.state = {
            height: 40
        }
    }

    updateSize = (height) => {
        this.setState({
            height
        })
    };

    render() {
        const {height} = this.state;
        styles.messageInput.height = height;
        return (
            <TextInput
                style={styles.messageInput}
                placeholder="Enter Message..."
                onChangeText={(text) => this.props.handleTextChange(text) }
                editable={true}
                multiline={true}
                value={this.props.val}
                onContentSizeChange={(e) => {this.updateSize(e.nativeEvent.contentSize.height)}}
            />
        )
    }
};

const styles = StyleSheet.create({
    messageInput: {
        fontSize: 18,
        paddingHorizontal: 10,
        paddingBottom: 5,
        margin: 8,
        width: 300,
        maxHeight: 100,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#e6e6e6'
    }
});

