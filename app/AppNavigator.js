import { createAppContainer, createSwitchNavigator ,createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import React from 'react'
import Splash from './screens/Splash/Splash';
import Login from './screens/Login/Login';
import Register from './screens/Register/Register';
import Dashboard from './screens/Dashboard/Dashboard';
import Settings from './screens/Settings/Settings';
import ConversationList from './screens/ConversationList/ConversationList';
import ConversationScreen from './screens/ConversationScreen/ConversationScreen';
import VideoCall from './screens/VideoCall/VideoCall';
import Add from './screens/Add/Add';

import  Icon  from 'react-native-vector-icons/Feather';


const Navigator = createSwitchNavigator({
    LoggedOut: createStackNavigator({
        Splash,
        Login,
        Register
    }),
    LoggedIn : createBottomTabNavigator({
            Dashboard: {
                screen: Dashboard,
                navigationOptions: {
                    tabBarIcon: ({ tintColor }) => (
                        <Icon name="home" fontSize={20} style={{color: tintColor}}/>
                    )
                }
            },
            Message: {
                screen: createStackNavigator({
                    ConversationList,
                    ConversationScreen,
                    VideoCall
                }),
                navigationOptions: {
                    tabBarIcon: ({ tintColor }) => (
                        <Icon name="search" fontSize={20} style={{color: tintColor}}/>
                    )
                }
            },
            Add: {
                screen: Add,
                navigationOptions: {
                    tabBarIcon: ({ tintColor }) => (
                        <Icon name="plus-circle" fontSize={20} style={{color: tintColor}}/>
                    )
                }
            },
            Settings: {
                screen: Settings,
                navigationOptions: {
                    tabBarLabel: '',
                    tabBarIcon: ({ tintColor }) => (
                        <Icon name="user" fontSize={20} style={{color: tintColor}}/>
                    )
                }
            }
        }, {
            tabBarOptions: {
                activeTintColor: 'black',
                inactiveTintColor: 'grey',
                showLabel: false
            }
        })
});

const AppNavigator = createAppContainer(Navigator);

export default AppNavigator;
