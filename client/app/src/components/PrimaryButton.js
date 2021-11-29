import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native';

const PrimaryButton = ({onPress, disabled, text}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={disabled ? {...styles.button, ...styles.disable} : styles.button}
      onPress={onPress}>
      <Text style={styles.textButton}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    paddingHorizontal: 30,
    marginTop: 30,
    height: 60,
    backgroundColor: '#070D99',
    color: '#ffffff',
  },
  disable: {
    backgroundColor: '#484848',
    color: '#ffffff',
  },
  textButton: {
    color: 'white',
    fontSize: 20,
  },
});

export default PrimaryButton;
