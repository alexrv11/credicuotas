import React, { useContext } from 'react';
import Pincode from 'components/PingCode';
import { SafeAreaView, StyleSheet } from 'react-native';

const VerifySignInCodeScreen = ({ route, navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Pincode
        codeSize={6}
        onComplete={code => {
          console.log('code', code);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 5,
  },
});

export default VerifySignInCodeScreen;
