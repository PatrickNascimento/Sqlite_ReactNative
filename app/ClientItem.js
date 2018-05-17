import React from 'react'
import { TouchableBox, BoxSection } from '../components/utils'
import { View, Text, Image, StyleSheet } from 'react-native'

const ClientItem = (props) => {
  return (
    <TouchableBox
      style={{ flex: 1,
               alignItems: 'stretch',
               flexDirection : 'row',
               backgroundColor : '#f8f8f8'}}
      onPress={props.onPress} >

          <Image 
            style={styles.canvas}
            source={require('../imgs/avatar.png')} />
          <View style={{ flex: 3,
                         paddingLeft: 30,
                         alignSelf: 'center',
                         flexDirection: 'column'}}>
            <Text
              style={{ flex: 1,
                       fontWeight: 'bold'
                     }}
            >
              {props.client}
            </Text>
            <Text
              style={{flex: 1,
                      alignSelf: 'flex-start'}}
              >
              {props.email}
            </Text>
            <Text
              style={{flex: 1,
                      alignSelf: 'flex-start'}}
              >
              {props.telefone}
            </Text>
          </View>
          <Text style={{ flex: .7}}>

            {props.codCli}
          </Text>
    </TouchableBox>
  )
}

const styles = StyleSheet.create({
    canvas : {
      resizeMode: 'cover'
      // position : 'absolute',
      // top: 10,
      // right: 0,
      // left: 0,
      // bottom: 20,
      // paddingBottom: 20,
      // marginBottom: 20,
      // marginRight: 20
    }
})

export default ClientItem
