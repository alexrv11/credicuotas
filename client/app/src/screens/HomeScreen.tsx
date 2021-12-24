import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.requestLoanButton}
        onPress={() => {navigation.navigate('RegisterLoanFlow')}}
      >
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
    flex: 5,
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
});

export default HomeScreen;
