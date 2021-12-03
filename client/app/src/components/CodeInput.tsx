import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CodeInput = ({ code }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.code}>{code}</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  code: {
    fontSize: 26,
    textAlign: 'center',
    color: '#1a237e',
    width: 25,
  },
  line: {
    width: 25,
    height: 5,
    borderRadius: 1,
    backgroundColor: '#1a237e',
  },
});

export default CodeInput;
