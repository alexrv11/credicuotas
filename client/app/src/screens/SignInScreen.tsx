import { useContext, useState, useCallback, useEffect } from 'react';
import PrimaryButton from 'components/PrimaryButton';
import Spacer from 'components/Spacer';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Input, Text, Image } from 'react-native-elements';
import Loading from 'components/Loading';
import { useSendCodeByEmailMutation } from 'api/graphql/generated/graphql';
import { useAuth } from 'context/AuthContext';
import { validateEmail } from '../utils/fields-validator';

const SignInScreen = ({ navigation }) => {
  const { setUserEmail, userEmail: email } = useAuth();
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);

  const [sendCodeMutation, { data, error }] = useSendCodeByEmailMutation({
    variables: { email },
  });

  const onSubmit = useCallback(() => {
    sendCodeMutation({ variables: { email } });
    setLoading(true);
  }, [sendCodeMutation, email]);

  useEffect(() => {
    if (data) {
      navigation.navigate('VerifyCode');
      setLoading(false);
    }
  }, [data, navigation, setUserEmail, email]);

  useEffect(() => {
    if (!email) {
      return;
    }

    if (validateEmail(email)) {
      setDisable(false);
      return;
    }

    setDisable(true);
  }, [email]);

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Spacer />
        <Text style={styles.description}>
          Accede a un prestamo de forma simple y rapida
        </Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.inputLabel}>Ingresa tu correo</Text>
        <Input
          placeholder="ejemplo@direccion.com"
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          leftIcon={{ type: 'material', name: 'email', color: '#070D99' }}
          value={email}
          onChangeText={setUserEmail}
        />
        <PrimaryButton
          onPress={onSubmit}
          text="Iniciar Session"
          disabled={disable}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  form: {
    width: '100%',
    flex: 3,
  },
  header: {
    flex: 2,
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
