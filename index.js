/** @format */
// import 'RCTLog';
import './shim';
import process from 'process';
import buffer from 'buffer';
import {AppRegistry} from 'react-native';
import App from './app/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
