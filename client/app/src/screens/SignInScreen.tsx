import { useContext, useState, useCallback } from 'react';
import PrimaryButton from 'components/PrimaryButton';
import Spacer from 'components/Spacer';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Input, Text, Image } from 'react-native-elements';
import { AuthContext } from 'context/AuthContext';
import { useSignInByEmailMutation } from 'api/graphql/generated/graphql';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const { signin } = useContext(AuthContext);

  const [signInByEmailMutation, { data, loading, error }] =
    useSignInByEmailMutation({ variables: { email } });

  const onSubmit = useCallback(() => {
    signInByEmailMutation({ variables: { email } });
  }, [signInByEmailMutation, email]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Spacer />
        <Text style={styles.description}>
          Accede a un prestamo de forma simple y rapida
        </Text>
      </View>
      <Spacer />
      <Spacer />
      <View style={styles.form}>
        <Text style={styles.inputLabel}>Ingresa tu correo</Text>
        <Input
          placeholder="ejemplo@direccion.com"
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          leftIcon={{ type: 'material', name: 'email', color: '#070D99' }}
          value={email}
          onChangeText={setEmail}
        />
        <PrimaryButton
          onPress={onSubmit}
          text="Iniciar Session"
          disabled={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 25,
    marginBottom: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  form: {
    width: '100%',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logo: {
    width: 90,
    height: 120,
  },
  text: {
    color: '#070D99',
  },
  inputLabel: {
    marginLeft: 12,
    marginBottom: 10,
    fontSize: 18,
    color: '#070D99',
  },
  description: {
    fontSize: 20,
    paddingHorizontal: 20,
    color: '#070D99',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SignInScreen;
