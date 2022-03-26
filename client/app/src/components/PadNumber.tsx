import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const BACKSPACE = 'backspace';
const Empty = '';

const PadNumber = ({ onPressDigit, onBackSpace }) => {
  const keys = [
    [{ key: '1' }, { key: '2' }, { key: '3' }],
    [{ key: '4' }, { key: '5' }, { key: '6' }],
    [{ key: '7' }, { key: '8' }, { key: '9' }],
    [{ key: Empty }, { key: '0' }, { key: BACKSPACE }],
  ];

  return (
    <View style={styles.container}>
      {keys.map((row, index) => {
        return (
          <View style={styles.row} key={index}>
            {row.map(item =>
              item.key === BACKSPACE ? (
                <TouchableOpacity
                  key={item.key}
                  style={styles.key}
                  onPress={onBackSpace}>
                  <Icon
                    name={BACKSPACE}
                    style={styles.keyText}
                    type="material"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  key={item.key}
                  style={styles.key}
                  onPress={() => {
                    if (item.key !== Empty) {
                      onPressDigit(item.key);
                    }
                  }}>
                  <Text style={styles.keyText}>{item.key}</Text>
                </TouchableOpacity>
              ),
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: 200,
  },
  row: {
    flexDirection: 'row',
  },
  icon: {
    height: 24,
    width: 24,
  },
  key: {
    paddingVertical: 5,
    marginVertical: 3,
    marginHorizontal: 3,
    backgroundColor: '#1a5b91',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    flex: 1,
  },
  keyText: {
    fontSize: 22,
    color: '#d2d2d2',
  },
});

export default PadNumber;
