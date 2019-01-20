import React from 'react';
import {StyleSheet, Text, View,Image, TextInput, TouchableOpacity} from 'react-native';

const CategoryButton = props => {
    return (
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
            <View style={styles.imageWrapper}>
                <Image
                    style={styles.image}
                    source={ props.image }
                />
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>
                    {props.title}
                </Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    imageWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 350,
        height: '100%',
    },
    image: {
        borderRadius: 10,
        flex: 1,
        resizeMode: 'cover',
        width: '100%'
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
    },
    button: {
        width: 350,
        height: 100,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        shadowColor: '#303838',
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 1,
        shadowOpacity: 0.35,
    },
});

export default CategoryButton;
