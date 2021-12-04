import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import PadNumber from './PadNumber';
import SecurityCodeInput from './SecurityCodeInput';
import Spacer from './Spacer';

const PingCode = ({ hidden, onComplete, codeSize }) => {
  const [index, setIndex] = useState(0);
  var initCodes = [];
  for (let i = 0; i < codeSize; i++) {
    initCodes[i] = { key: `${i}`, code: '' };
  }
  const [elements, setElements] = useState(initCodes);

  const setElement = (i, newValue) => {
    var values = [...elements];
    values[i].code = newValue;
    setElements(values);
  };

  return (
    <View style={styles.pad}>
      <Spacer />
      <SecurityCodeInput hidden={hidden} elements={elements} title="" />
      <PadNumber
        onPressDigit={key => {
          if (index < elements.length) {
            setElement(index, key);
            setIndex(index + 1);
          }
          const secret = elements.map(item => item.code).join('');

          if (secret.length === elements.length) {
            onComplete(secret);
          }
        }}
        onBackSpace={() => {
          if (index > 0) {
            setElement(index - 1, '');
            setIndex(index - 1);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pad: {
    flex: 3,
    justifyContent: 'space-between',
  },
});

export default PingCode;