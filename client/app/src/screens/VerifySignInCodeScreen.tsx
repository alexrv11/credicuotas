import React, { useContext, useCallback, useEffect, useMemo } from 'react';
import Pincode from 'components/PingCode';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Avatar, Text } from 'react-native-elements';
import { AuthContext, useAuth } from 'context/AuthContext';
import Spacer from 'components/Spacer';
import { useSignInWithCodeMutation } from 'api/graphql/generated/graphql';

const VerifySignInCodeScreen = ({ route, navigation }) => {
  const {userEmail, setError} = useAuth()

  const [signInMutation, { data, loading, error }] =
    useSignInWithCodeMutation();

  const signIn = (email: string, code: string) => {
    signInMutation({ variables: { email, code } });
  };

  useEffect(() => {
    console.log(error);
    if (error) {
      console.log('set error');
      setError('', 'invalid_code');
    }
  }, [error, setError]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Avatar
          size={150}
          rounded
          icon={{ name: 'email', color: '#0c0f69' }}
          activeOpacity={0.7}
          size="large"
          containerStyle={styles.avatarContainer}
        />
        <Spacer />
        <Text style={styles.textAvatar}>
          Te enviamos un codigo de seis digitos al email
        </Text>
        <Text style={styles.textEmail}>{userEmail}</Text>
      </View>
      <Pincode
        codeSize={6}
        onComplete={(code: string) => {
          signIn(userEmail || '', code);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 5,
    justifyContent: 'center',
    padding: 5,
  },
  avatarContainer: {
    backgroundColor: '#d1d2e9',
    borderRadius: 150,
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAvatar: {
    fontSize: 18,
    width: 260,
    textAlign: 'center',
  },
  textEmail: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 17,
    color: '#0c0f69',
  },
});

export default VerifySignInCodeScreen;
