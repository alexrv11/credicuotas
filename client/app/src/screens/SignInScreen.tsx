import React from 'react';
import { Text, TouchableOpacity, SafeAreaView } from 'react-native';

const SignInScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Sign in screen</Text>
      <TouchableOpacity onPress={() => console.log('Signed in with Google!')}>
        <Text>Sign in with Google</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignInScreen;
