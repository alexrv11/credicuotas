import React, { useEffect } from 'react';
import Pincode from 'components/PingCode';
import { StackActions } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Avatar, Text } from 'react-native-elements';
import Spacer from 'components/Spacer';
import Loading from 'components/Loading';
import { useState } from 'react';
import { useAuth } from 'context/AuthContext';

const VerifyPhoneCodeScreen = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);
  const { userPhone } = useAuth();

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
        <Spacer />
        <Text style={styles.textAvatar}>
          Te enviamos un codigo de seis digitos al telefono
        </Text>
        <Text style={styles.textPhone}>{userPhone}</Text>
      </View>
      <Pincode
        codeSize={6}
        onComplete={(code: string) => {
          console.log(code);
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
  textPhone: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 17,
    color: '#0c0f69',
  },
});

export default VerifyPhoneCodeScreen;
