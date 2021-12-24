import { useCallback } from 'react';
import Spacer from 'components/Spacer';
import React from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { useLoan } from 'context/LoanContext';

const IncomeLoanScreen = ({ navigation }) => {
  const { amount, totalInstallments } = useLoan();

  const onSubmit = useCallback(
    (incomeType: String) => {
      console.log('selected', incomeType, amount, totalInstallments);
    },
    [amount, totalInstallments],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textHeader}>Seleccione la fuente de ingreso</Text>
      <Spacer />
      <View style={styles.options}>
        <TouchableOpacity
          style={styles.incomeContainer}
          onPress={() => {
            onSubmit('own-business');
          }}>
          <Icon name="business" style={styles.incomeIcon} type="material" />
          <View style={styles.incomeDescriptionContainer}>
            <Text style={styles.text}>Negocio propio</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.incomeContainer}
          onPress={() => {
            onSubmit('own-employee');
          }}>
          <Icon name="work" style={styles.incomeIcon} type="material" />
          <View style={styles.incomeDescriptionContainer}>
            <Text style={styles.text}>Trabajador independiente</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.incomeContainer}
          onPress={() => {
            onSubmit('private-company-employee');
          }}>
          <Icon name="group-work" style={styles.incomeIcon} type="material" />
          <View style={styles.incomeDescriptionContainer}>
            <Text style={styles.text}>Asalariado empresa privada</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.incomeContainer}
          onPress={() => {
            onSubmit('public-employee');
          }}>
          <Icon name="groups" style={styles.incomeIcon} type="material" />
          <View style={styles.incomeDescriptionContainer}>
            <Text style={styles.text}>Asalariado funcionario publico</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  incomeContainer: {
    height: 70,
    marginTop: 15,
    backgroundColor: '#bcbde5',
    color: '#0e0950',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  incomeDescriptionContainer: {
    marginLeft: 25,
  },
  incomeIcon: {
    color: '#070D99',
    marginLeft: 25,
  },
  options: {
    width: '100%',
  },
  text: {
    color: '#070D99',
    fontSize: 17,
  },
  textHeader: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#05085e',
  },
});

export default IncomeLoanScreen;
