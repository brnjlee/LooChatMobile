import React from 'react';
import {StyleSheet, TouchableOpacity, Image, View, Text} from 'react-native';

const Conversation = props => {
    console.log(props.title.avatar);
    return (
        <TouchableOpacity style={styles.conversation} onPress={props.handlePress}>
            <Image
                style={styles.image}
                source={{uri: `https:${props.title.avatar}`}}
            />
            <View>
                <Text style={styles.title}> {props.title.name}</Text>
                <Text style={styles.content}> {props.content}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    conversation: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        // borderBottomWidth: 1,
        // borderBottomColor: '#f2f2f2'
    },
    image: {
        height: 40,
        width: 40,
        borderRadius: 20,
        margin: 10,
    },
    title: {
        fontSize: 16,
    },
    content: {
        opacity: 0.7
    }
});

export default Conversation;
