import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
  const { text, btn  } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={btn}>
      <Text style={text}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  text: {
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: 'center',
    color: '#888',
    fontSize: 16,
  },
  btn: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    marginLeft: 6,
    marginRight: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#888',
  }
};

export { Button };
