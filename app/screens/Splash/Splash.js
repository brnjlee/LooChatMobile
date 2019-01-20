import React from 'react';
import {StyleSheet, Text, Button, View, Image} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SplashButton from '../../components/SplashButton/SplashButton';
const remote = require('../../config/images/facebook-messenger.jpg');

class Splash extends React.Component {
    static navigationOptions = {
        headerStyle: {
            display: 'none',
        },
    }
    constructor() {
        super();
        this.state = {
        }
    }

    componentWillReceiveProps(nextProps) {
        const { navigate } = this.props.navigation;
        if(nextProps.auth.isAuthenticated) {
            navigate('Welcome')
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={{flex: 1}}>
                <View style={styles.imageWrapper}>
                    {/*<Image*/}
                        {/*style={styles.image}*/}
                        {/*source={ remote }*/}
                    {/*/>*/}
                </View>
                <View style={styles.container}>
                    <View style={{flexDirection: 'row'}}>
                        <Image
                            style={styles.logo}
                            source={ remote }
                        />
                        {/*<Text style={styles.logoBegin} >test</Text><Text style={styles.logoEnd}></Text>*/}
                    </View>
                    <View>
                        <SplashButton style={styles.signUp} title="SIGN UP" onPress={() => navigate('Register')}/>
                        <SplashButton title="LOG IN" onPress={() => navigate('Login')}/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0)',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    imageWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    image: {
        flex: 1,
        width: '100%',
        resizeMode: 'cover',
    },
    logo: {
        width: 100,
        height: 100
    },
    logoBegin: {
        fontSize:50,
        fontWeight: '300',
        color: 'white',
    },
    logoEnd: {
        fontSize:50,
        fontWeight: 'bold',
        color: 'white',
    },
    // signUp: {
    //     borderColor: 'white',
    //     borderWidth: 1,
    //     width: 300,
    //     alignItems: 'center',
    //     paddingTop: 10,
    //     paddingBottom: 10,
    //     borderRadius: 20,
    //     marginBottom: 20
    // },
    signUp: {
        borderColor: '#0066ff',
        backgroundColor: '#0066ff',
        borderWidth: 1,
        width: 300,
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 20,
        marginBottom: 20
    }
});

Splash.propTypes = {
};

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(mapStateToProps)(Splash);
