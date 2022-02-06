import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import Spacer from 'components/Spacer';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Solicita tu prestamo</Text>
      <Spacer />
      <TouchableOpacity
        style={styles.requestLoanButton}
        onPress={() => {
          navigation.navigate('LoanAmount');
        }}>
        <Avatar
          size={90}
          rounded
          icon={{ name: 'add', color: '#d4dbee' }}
          activeOpacity={0.7}
          containerStyle={styles.avatarContainer}
        />
        <Text style={styles.requestLoanText}>Solicitar Prestamo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    backgroundColor: '#070D99',
    borderRadius: 90,
  },
  requestLoanButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  requestLoanText: {
    marginTop: 10,
  },
  textTitle: {
    fontSize: 18,
    color: '#070D99',
    textAlign: 'center',
  },
});

export default HomeScreen;
