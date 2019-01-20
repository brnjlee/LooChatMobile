import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

const Message = props => {
    return(
        <View>
            <View style={props.fromUser? styles.messageUser : styles.messageOther} id={props.fromUser? "message-user" : "message-received"}>
                <Text style={props.fromUser? styles.userContent: styles.otherContent}>{props.children}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    messageUser: {
        backgroundColor: '#3385ff',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf: 'flex-end',
        borderRadius: 20,
        marginRight: 5,
        marginTop: 5
    },
    messageOther: {
        backgroundColor: '#ebebeb',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        borderRadius: 20,
        marginLeft: 5,
        marginTop: 5
    },
    userContent: {
        fontSize: 18,
        paddingVertical: 9,
        paddingHorizontal: 12,
        color: 'white'
    },
    otherContent: {
        fontSize: 18,
        paddingVertical: 9,
        paddingHorizontal: 12
    }
})

Message.propTypes = {
  fromUser: PropTypes.bool.isRequired,
};

export default Message;
