import React from 'react';
import {StyleSheet,TouchableOpacity, Text, View } from 'react-native';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CategoryButton from '../../components/CategoryButton/CategoryButton';

class Add extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    onPress = () => {

    }

    render() {
        return (
            <View style={styles.container}>
                {/*<CategoryButton title="Groceries" image={require('../../images/grocery.jpg')} onPress={this.onPress}/>*/}
                {/*<CategoryButton title="Trip" image={require('../../images/drive.jpg')} onPress={this.onPress}/>*/}
                {/*<CategoryButton title="Shopping" image={require('../../images/shopping.jpg')} onPress={this.onPress}/>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    category: {
        backgroundColor: '#859a9b',
        borderRadius: 10,
        width: 100,
        height: 100
    }
});

Add.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps )(Add);
