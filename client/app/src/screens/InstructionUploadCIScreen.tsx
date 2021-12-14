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
import PrimaryButton from 'components/PrimaryButton';

const InstructionUploadCIScreen = ({ route, navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Avatar
          size={150}
          rounded
          icon={{ name: 'account-circle', color: '#0c0f69' }}
          activeOpacity={0.7}
          size="large"
          containerStyle={styles.avatarContainer}
        />
        <Spacer />
        <Text style={styles.textAvatar}>
          Necesitamos verificar tu cedula de identidad
        </Text>
        <Spacer />
        <Text style={styles.textDescription}>Te recomendamos estar en un ambiente con mucha iluminacion</Text>
      </View>
      <Spacer />
      <PrimaryButton
        onPress={() => console.log('continuar')}
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

export default InstructionUploadCIScreen;
