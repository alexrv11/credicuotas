import { AuthContext } from 'context/AuthContext';
import React, { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import PadNumber from './PadNumber';
import SecurityCodeInput from './SecurityCodeInput';
import Spacer from './Spacer';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
var initCodes = [];
const PingCode = ({ hidden, onComplete, codeSize }) => {
  const { error } = useAuth();
  const [errorText, setErrorText] = useState('');

  const [index, setIndex] = useState(0);
  for (let i = 0; i < codeSize; i++) {
    initCodes[i] = { key: `${i}`, code: '' };
  }
  const [elements, setElements] = useState(initCodes);

  const setElement = (i: number, newValue: string) => {
    var values = [...elements];
    values[i].code = newValue;
    setElements(values);
  };

  useEffect(() => {
    if (error) {
      setElements(initCodes);
      setErrorText('El codigo no es valido');
    }
  }, [error, setElements]);

  return (
    <View style={styles.pad}>
      <SecurityCodeInput hidden={hidden} elements={elements} title="" errorText={errorText}/>
      <PadNumber
        onPressDigit={key => {
          setErrorText('');
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
    justifyContent: 'space-around',
  },
});

export default PingCode;
