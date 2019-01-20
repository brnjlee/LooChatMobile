import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import { connect } from 'react-redux';
import {loginUser, registerUser} from '../../actions/authentication';
import PropTypes from 'prop-types';

import Input from '../../components/Input/Input';
import SplashButton from '../../components/SplashButton/SplashButton';

// const remote = require('../../images/gradient.jpg');

class Login extends React.Component {
    static navigationOptions = {
        headerStyle: {
            display: 'none',
        },
    }
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    componentDidMount() {
        console.log(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    handleSubmit = () => {
        const user = {
            email: this.state.email.toLowerCase(),
            password: this.state.password,
        };
        this.props.loginUser(user);
    }
    render() {
        const  { errors }  = this.state;
        console.log(this.state);
        const resizeMode = 'cover';
        return (
            <View style={{flex: 1}}>
                <View style={styles.imageWrapper}>
                    {/*<Image*/}
                        {/*style={styles.image}*/}
                        {/*source={ remote }*/}
                    {/*/>*/}
                </View>
                <View style={styles.container}>
                    <Text style={styles.header}>Log in</Text>
                    <View style={{width: 300, justifyContent:'flex-start'}}>
                        {errors.email ? (
                            <Text style={styles.label}>{errors.email}</Text>
                        ) : (
                            <Text style={styles.label}>Email</Text>
                        )}
                        <Input setText={(email) => {this.setState({email})}} />
                        {errors.password ? (
                            <Text style={styles.label}>{errors.password}</Text>
                        ) : (
                            <Text style={styles.label}>Password</Text>
                        )}
                        <Input setText={(password) => {this.setState({password})}} isSecure={true} />
                        <Text>{"\n"}</Text>
                        <SplashButton title="LOG IN" onPress={this.handleSubmit}/>
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
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        paddingBottom: 30
    },
    label: {
        fontSize: 18,
        fontWeight:'bold',
        color: '#666666',
        paddingBottom:10
    },
});

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth
});

export default connect(mapStateToProps,{ loginUser })(Login);
