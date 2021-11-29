import PrimaryButton from 'components/PrimaryButton';
import Spacer from 'components/Spacer';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Input, Text, Image } from 'react-native-elements';

const SignInScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Spacer />
        <Text>Accede a un prestamo de forma simple y rapida</Text>
      </View>
      <View style={styles.row}>
        <Text h4 style={{marginLeft:12, marginBottom:10}}>Ingresa tu correo</Text>
        <Input
          placeholder="ejemplo@direccion.com"
          leftIcon={{ type: 'material', name: 'email', color: '#070D99' }}
        />
        <Spacer />
        <PrimaryButton
        onPress={() => console.log('Signed in with Google!')}
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  row: {
    width: '100%',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 90,
    height: 120,
  },
  text: {
    color: '#070D99',
  },
});

export default SignInScreen;
