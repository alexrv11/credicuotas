import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import CodeInput from './CodeInput';
import SecretInput from './SecretInput';
import Spacer from './Spacer';

const SecurityCodeInput = ({ title, elements, hidden }) => {
  return (
    <View style={styles.container}>
      <Spacer>
        <Icon name="lock" size={24} color="#1a237e" type="material" />
      </Spacer>
      <Text style={styles.title}>{title}</Text>
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
});
export default SecurityCodeInput;
