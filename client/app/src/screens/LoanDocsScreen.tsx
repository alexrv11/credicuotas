import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Avatar, Text } from 'react-native-elements';
import Spacer from 'components/Spacer';
import PrimaryButton from 'components/PrimaryButton';

const LoanDocsScreen = ({ route, navigation }) => {
  const { requirementType, title, description } = route.params;
  console.log('loan docs', route.params);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textAvatar}>{description}</Text>
        <Spacer />
        <Text style={styles.textDescription}>Te recomendamos estar en un ambiente con mucha iluminacion</Text>
      </View>
      <Spacer />
      <PrimaryButton
        onPress={() => navigation.navigate('CameraScan', { requirementType })}
        text="Continuar"
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

export default LoanDocsScreen;
