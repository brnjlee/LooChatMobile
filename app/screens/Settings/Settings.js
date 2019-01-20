import React from 'react';
import {StyleSheet } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Button } from 'native-base';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authentication';

class Settings extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    logout = () => {
        this.props.logoutUser();
    }

    render() {
        return (
            <Container>
                <Content>
                    <List>
                        <ListItem>
                            <Button transparent onPress={this.logout}><Text style={{color: 'black'}}>Logout</Text></Button>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
});

Settings.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(Settings);
