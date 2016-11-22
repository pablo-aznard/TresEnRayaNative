/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import App from './src/js/App.js';

var Tresenraya = React.createClass({
	render:function(){
		return (
			<App />
		);
	}
});

AppRegistry.registerComponent('TresEnRaya', () => Tresenraya);
