/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler'
import AppEntry from './app/AppEntry';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppEntry);
