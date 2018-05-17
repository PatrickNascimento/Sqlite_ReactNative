import Expo, { SQLite } from 'expo';
import React from "react";
import axios from 'axios';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  Alert,
  Button,
  AsyncStorage
} from "react-native";

const css =  require('./styles/style');

const {
  container,
  input,
  textArea,title,button,
  btn, buttonf, buttonsync,
  textButton
} = css;

import { Actions } from "react-native-router-flux";
const db = SQLite.openDatabase('db.db');

var sample = '';
var data = [];

export default class app extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      disabled: true,
      codigo: "",
      nome: "",
      email: "",
      telefone: ""
    }

    db.transaction((tx) =>{
      tx.executeSql('SELECT * FROM usuarios order by codigo desc limit 1',[],(tx,results) => {
        var len = results.rows.length;
        if(len>0){
          var row = results.rows.item(0);
          this.setState({codigo: JSON.stringify(row.codigo)});
          this.setState({nome: row.nome});
          this.setState({email: row.email});
          this.setState({telefone: row.telefone});
        }
      });
    });
  }

  componentWillMount () {
    axios.get('http://10.1.1.39:211/client')
    .then(resp => {
      console.log(resp.data.result)
      this.setState({ items : resp.data.result })
    }
  ).catch(e => console.log('Erro verifique se o Node está Rodando: ', e))
}

changeCodigo(codigo) {
  this.setState({ codigo });
}
changeNome(nome) {
  this.setState({ nome });
}
changeEmail(email) {
  this.setState({ email });
}
changeTelefone(telefone) {
  this.setState({ telefone });
}

componentDidMount() {
  db.transaction(tx => {
    tx.executeSql(
      'create table if not exists usuarios (codigo integer, nome text, email text, telefone text);'
    );
  });
}

add(codigo,nome,email,telefone) {
  db.transaction(
    tx => {
      tx.executeSql('insert into usuarios (codigo,nome,email,telefone) values (?,?,?,?)',[codigo,nome,email,telefone]);
      console.log(codigo,nome,email,telefone);
    }
  );
}

sync(code,name,city,key){
  db.transaction(
    tx => {
      tx.executeSql('insert into usuarios (codigo,nome,email,telefone) values (?,?,?,?)',[code,name,city,key]);
      console.log('gerado carga com sucesso');
    }
  );
}

SyncSend(){
  return this.state.items.map((item) =>(
    this.sync(item.CODE,item.NAME,item.CITY,item.KEY)
  )
)
}

deletet(){
  db.transaction(
    tx => {
      tx.executeSql('drop table usuarios');
      Alert.alert('Tabela dropada com sucesso!');
    }
  );

}

ler() {
  db.transaction((tx) =>{
    tx.executeSql('SELECT codigo,nome,email,telefone FROM usuarios',[],(tx,results) => {
      var len = results.rows.length;
      if(len>0){
        var row = results.rows;
        console.log(row);
      }
    });
  });
}


envia() {
  axios.post("http://10.1.1.39:3000/receive",
  data = {
    "Nome": "Patrick Nascimento",
    "Nome2": "Luiz Ferrari",
    "Nome3": "Arthur Picket",
  })
  .then(function(response){
    console.log('Enviado com sucesso')
  });
}

render() {
  return (
    <View style={container}>
      <View style={{marginTop:20}}>
        <Text style={title}>Sqlite RN -> Cadastro de Cliente</Text>

        <TextInput
          style={input}
          placeholder="Código"
          value={this.state.codigo}
          onSubmitEditing={()=>this.nome.focus()}
          ref={(input)=>this.codigo = input}
          onChangeText={codigo => this.changeCodigo(codigo)}
          />

        <TextInput
          style={input}
          placeholder="Nome"
          value={this.state.nome}
          onSubmitEditing={()=>this.email.focus()}
          ref={(ref)=>this.nome = ref}
          onChangeText={nome => this.changeNome(nome)}
          />

        <TextInput
          style={input}
          placeholder="email"
          value={this.state.email}
          onSubmitEditing={()=>this.telefone.focus()}
          ref={(ref)=>this.email = ref}
          onChangeText={email => this.changeEmail(email)}
          />
        <TextInput
          style={css.input}
          placeholder="Telefone"
          value={this.state.telefone}
          ref={(input)=>this.telefone = input}
          onChangeText={telefone => this.changeTelefone(telefone)}
          />
        <View style={btn}>
          <Button
            title="Salvar"
            ref={(ref)=>this.enviar = ref}
            onPress={() => { this.add(
              this.state.codigo,
              this.state.nome,
              this.state.email,
              this.state.telefone)

              this.setState({ codigo: null });
              this.setState({ nome: null });
              this.setState({ email: null });
              this.setState({ telefone: null });
              Alert.alert('Dados inseridos com sucesso!')
            }
          }
          />
      </View>

      <View style={btn}>
        <Button
          onPress={() => this.deletet()}
          title="Dropar Table"
          />
      </View>

      <View style={btn}>
        <Button
          onPress={() => Actions.list()}
          title="Exibir Dados"
          />
      </View>

      <View style={btn}>
        <Button
          disabled={this.state.disabled}
          onPress={() => Actions.listf()}
          title="Clientes Firebird"
          />
      </View>

      <View style={css.btn}>
        <Button
          disabled={this.state.disabled}
          onPress={() => this.SyncSend()}
          title="Gerar Carga inicial"
          />
      </View>

      <View style={css.btn}>
        <Button
          disabled={this.state.disabled}
          onPress={() => this.envia()}
          title="Sync Mobile 2 ERP"
          />
      </View>
    </View>
  </View>
);
}
}
