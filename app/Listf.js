import Expo, { SQLite } from 'expo';
import React, { Component } from "react";
import axios from 'axios'
import ClientItem from './ClientItem'
import {
  TouchableHighlight,
  Text,
  View,
  AsyncStorage,
  StyleSheet,
  ScrollView,
  Alert
} from "react-native";
import { Actions } from "react-native-router-flux";

var exlist = '';

export default class Listf extends Component {

  constructor(props){
    super(props)
    this.state = {
      items : []
    }
  }

  componentWillMount () {
    axios.get('http://10.1.1.39:211/client')
    .then(resp => {
      console.log(resp.data.result)
      this.setState({ items : resp.data.result })
    }
  ).catch(e => console.log('error no catch: ', e))
}


dados(i){
  exlist = {i}
  Actions.busca();
}

renderListItems = () => this.state.items.map((item) => (
  <ClientItem
        client={item.NAME}
        codCli={item.CODE}
        cidade={item.CITY}
        onPress={() => Actions.client({ client })} />
)
);

render() {
  return (
    <View style={styles.container}>

      <ScrollView>
        {this.renderListItems()}
      </ScrollView>

      <TouchableHighlight
        style={styles.button}
        onPress={() => Actions.home()}
        >
        <Text style={styles.textButton}>Volta para Cadastro</Text>
      </TouchableHighlight>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 50
  },
  button: {
    backgroundColor: "skyblue",
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 5,
    marginTop: 15
  },
  textButton: {
    textAlign: "left",
    fontSize: 18,
    color: "white"
  },
  datalista: {
    marginBottom: 5,
    padding: 20,
    marginTop: 5,
    height: 150,
    borderRadius: 10,
    backgroundColor: "#888888",
  }
});

export {exlist};
