import axios from 'axios';
import { AsyncStorage } from "react-native"
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import NavigationService from '../NavigationService';
import { api } from '../config/settings';

import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (user, navigate) => dispatch => {
    axios.post(`${api}/api/users/register`, user)
        .then(res => NavigationService.navigate('Login'))
        .catch(err => {
            console.log(err);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const loginUser = (user) => dispatch => {
    axios.post(`${api}/api/users/login`, user)
        .then(res => {
            const { token } = res.data;
            AsyncStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
            NavigationService.navigate('Dashboard')}
        )
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = () => dispatch => {
    AsyncStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    NavigationService.navigate('Splash');
}

