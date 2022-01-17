/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
const {default: App} = require('./AppWithProviders');

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
