/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler'
import AppMain from './App';
import {name as appName} from './app.json';
import { appStore } from './app/redux/Store';
import { Provider } from 'react-redux';

AppRegistry.registerComponent(appName, () => AppMain);
