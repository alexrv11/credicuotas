import { useContext, useState, useCallback, useEffect } from 'react';
import PrimaryButton from 'components/PrimaryButton';
import Spacer from 'components/Spacer';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Input, Text, Image } from 'react-native-elements';
import Loading from 'components/Loading';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [identifierNumber, setIdentifierNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);

  const onSubmit = useCallback(() => {
    console.log('hello register');
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.description}>Datos Personales</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.inputLabel}>Nombre y Apellido</Text>
        <Input
          placeholder="Ingresa tu nombre completo"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          leftIcon={{ type: 'material', name: 'person', color: '#070D99' }}
          value={name}
          onChangeText={setName}
        />
        <Spacer />
        <Text style={styles.inputLabel}>Numero de Documento</Text>
        <Input
          placeholder="Ingresa tu cedula de identidad"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          leftIcon={{ type: 'material', name: 'person', color: '#070D99' }}
          value={identifierNumber}
          onChangeText={setIdentifierNumber}
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

export default RegisterScreen;
