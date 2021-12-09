import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import CodeInput from './CodeInput';
import SecretInput from './SecretInput';
import Spacer from './Spacer';

const SecurityCodeInput = ({ title, elements, hidden, errorText }) => {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={elements}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => {
          return hidden ? (
            <SecretInput code={item.code} style={styles.input} />
          ) : (
            <CodeInput code={item.code} style={styles.input} />
          );
        }}
        keyExtractor={item => item.key}
      />
      <Text style={styles.errorInput}>{errorText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    marginBottom: 10,
  },
  input: {
    flex: 1,
  },
  separator: {
    width: 7,
  },
  errorInput: {
    marginTop: 20,
    color: '#611661',
    fontSize: 18,
  },
});
export default SecurityCodeInput;
