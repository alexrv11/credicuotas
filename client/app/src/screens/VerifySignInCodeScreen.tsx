import React, { useEffect } from 'react';
import Pincode from 'components/PingCode';
import { StackActions } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Avatar, Text } from 'react-native-elements';
import { useAuth } from 'context/AuthContext';
import Spacer from 'components/Spacer';
import { useSignInWithCodeMutation } from 'api/graphql/generated/graphql';
import Loading from 'components/Loading';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VerifySignInCodeScreen = ({ route, navigation }) => {
  const { userEmail, setError, setToken } = useAuth();
  const [loading, setLoading] = useState(false);

  const [signInMutation, { data, loading: apiLoading, error }] =
    useSignInWithCodeMutation();

  const signIn = (email: string, code: string) => {
    signInMutation({ variables: { email, code } }).catch((er) => {
      setLoading(false);
      console.log(er);
    });
  };

  useEffect(() => {
    console.log(error);
    if (error) {
      console.log('set error', error);
      setError(error);
    }
  }, [error, setError]);

  useEffect(() => {
    const saveToken = async (token: string) => {
      await AsyncStorage.setItem('token', token);
    };

    const token = data?.signInWithCode?.accessToken;
    if (token) {
      setLoading(false);
      saveToken(token);
      navigation.dispatch(StackActions.replace('OnboardingFlow'));
    }

    if (apiLoading) {
      setLoading(apiLoading);
    }
  }, [data, apiLoading, setLoading, setToken, navigation]);

  if (loading) {
    return <Loading />;
  }

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
        Te enviamos un código de seis dígitos al email
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
