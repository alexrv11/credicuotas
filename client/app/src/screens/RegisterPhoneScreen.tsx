import { useState, useCallback, useEffect } from 'react';
import PrimaryButton from 'components/PrimaryButton';
import { StackActions } from '@react-navigation/native';
import Spacer from 'components/Spacer';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Input, Text, Image, Avatar } from 'react-native-elements';
import Loading from 'components/Loading';
import { useAuth } from '../context/AuthContext';
import { useSendPhoneCodeMutation } from '../api/graphql/generated/graphql';
import { validatePositiveNumber, validatePhone } from '../utils/fields-validator';

const RegisterPhoneScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const { setUserPhone } = useAuth();
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);

  const [sendCodeByPhone] = useSendPhoneCodeMutation({
    variables: { phone: '+591' + phone },
  });

  const onSubmit = useCallback(() => {
    setUserPhone(phone);
    sendCodeByPhone();
    navigation.navigate('VerifyPhoneCode');
  }, [navigation, phone, setUserPhone, sendCodeByPhone]);

  useEffect(() => {
    if (phone.length >= 8) {
      setDisable(false);
      return;
    }
    setDisable(true);
  }, [phone]);

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Avatar
          size={150}
          rounded
          icon={{ name: 'phone', color: '#0c0f69' }}
          activeOpacity={0.7}
          containerStyle={styles.avatarContainer}
        />
      </View>
      <Spacer />
      <View style={styles.form}>
        <Text style={styles.inputLabel}>Numero de Celular</Text>
        <Input
          placeholder="Ingresa tu numero de celular"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          leftIcon={{ type: 'material', name: 'phone', color: '#070D99' }}
          value={phone}
          onChangeText={(phone) => {
            if (validatePositiveNumber(phone)) {
              setPhone(phone);
            }
          }}
        />
        <PrimaryButton onPress={onSubmit} text="Guardar" disabled={disable} />
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
  avatarContainer: {
    backgroundColor: '#d1d2e9',
    borderRadius: 150,
  },
  header: {
    flex: 1,
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

export default RegisterPhoneScreen;
