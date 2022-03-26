import { useCallback } from 'react';
import Spacer from 'components/Spacer';
import React from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { useLoan } from 'context/LoanContext';
import { StackActions } from '@react-navigation/native';

const IncomeLoanScreen = ({ navigation }) => {
  const { setIncomeType } = useLoan();

  const onSubmit = useCallback(
    (incomeType: String) => {
      setIncomeType(incomeType);
      navigation.dispatch(StackActions.replace('LoanRequirementType'));
    },
    [navigation, setIncomeType],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textHeader}>Seleccione la fuente de ingreso</Text>
      <Spacer />
      <View style={styles.options}>
        <TouchableOpacity
          style={styles.incomeContainer}
          onPress={() => {
            onSubmit('OWN_BUSINESS');
          }}>
          <Icon name="business" style={styles.incomeIcon} type="material" />
          <View style={styles.incomeDescriptionContainer}>
            <Text style={styles.text}>Negocio propio</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.incomeContainer}
          onPress={() => {
            onSubmit('ONW_EMPLOYEE');
          }}>
          <Icon name="work" style={styles.incomeIcon} type="material" />
          <View style={styles.incomeDescriptionContainer}>
            <Text style={styles.text}>Trabajador independiente</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.incomeContainer}
          onPress={() => {
            onSubmit('PRIVATE_COMPANY_EMPLOYEE');
          }}>
          <Icon name="group-work" style={styles.incomeIcon} type="material" />
          <View style={styles.incomeDescriptionContainer}>
            <Text style={styles.text}>Asalariado empresa privada</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.incomeContainer}
          onPress={() => {
            onSubmit('PUBLIC_EMPLOYEE');
          }}>
          <Icon name="groups" style={styles.incomeIcon} type="material" />
          <View style={styles.incomeDescriptionContainer}>
            <Text style={styles.text}>Asalariado funcionario público</Text>
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
