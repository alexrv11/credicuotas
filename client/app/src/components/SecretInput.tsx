import React from 'react';
import { StyleSheet, View } from 'react-native';

const SecretInput = ({ code }) => {
  return (
    <View
      style={
        code
          ? { ...styles.secret, ...styles.selected }
          : { ...styles.secret, ...styles.unselected }
      }
    />
  );
};

const styles = StyleSheet.create({
  secret: {
    borderRadius: 20 / 2,
    borderColor: '#7986cb',
    borderWidth: 1,
    width: 20,
    height: 20,
  },
  selected: {
    backgroundColor: '#1a237e',
  },
  unselected: {
    backgroundColor: '#e8eaf6',
  },
});

export default SecretInput;
