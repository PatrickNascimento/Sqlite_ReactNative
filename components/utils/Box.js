import React from 'react';
import { View, TouchableOpacity } from 'react-native';

const Box = (props) => {
  return (
    <TouchableOpacity style={[styles.containerStyle, props.style]}>
      {props.children}
    </TouchableOpacity>
  );
};

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
  }
};

export { Box };
