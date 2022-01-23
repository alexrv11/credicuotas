import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Avatar, Text } from 'react-native-elements';
import Spacer from 'components/Spacer';
import PrimaryButton from 'components/PrimaryButton';
import navigation from 'navigation';

const LoanCompletedScreen = ({ route, navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Avatar
          size={150}
          rounded
          icon={{ name: 'celebration', color: '#0c0f69' }}
          activeOpacity={0.7}
          size="large"
          containerStyle={styles.avatarContainer}
        />
        <Spacer />
        <Text style={styles.textAvatar}>
          Felicidades la solicitud de credito fue registrado
        </Text>
        <Spacer />
        <Text style={styles.textDescription}>
          Muy pronto un asesor de credito analizar la solicitud
        </Text>
      </View>
      <Spacer />
      <PrimaryButton
        onPress={() => navigation.navigate('Prestamo')}
        text="Volver"
        disabled={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 5,
    justifyContent: 'center',
    padding: 10,
    marginHorizontal: 15,
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
    fontSize: 22,
    width: 260,
    textAlign: 'center',
  },
  textDescription: {
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

export default LoanCompletedScreen;
