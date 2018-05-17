import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';
import App from './app/Routes'

class syncstore extends Component {
   render() {
      return (
        
         <App/> 
        
      )
   }
}
export default syncstore

AppRegistry.registerComponent('syncstore', () => syncstore)