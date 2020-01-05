/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler'
import AppMain from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppMain);
