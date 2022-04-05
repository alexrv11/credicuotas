import React, { useCallback, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Avatar, Text, Icon } from 'react-native-elements';
import Spacer from 'components/Spacer';
import PrimaryButton from 'components/PrimaryButton';
import { useLoan } from '../context/LoanContext';
import { useSaveLoanMutation } from 'api/graphql/generated/graphql';
import { StackActions } from '@react-navigation/native';

const types = [
  { type: 'LAST_INVOICE', icon: 'article', title: 'Ultima boleta de pago' },
  { type: 'OWN_ASSET', icon: 'directions-car', title: 'Bienes Personales' },
];

const LoanRequirementTypeScreen = ({ route, navigation }) => {
  const { amount, totalInstallments, setLoanId, loanType, setRequirementType } =
    useLoan();

  const [saveLoan, { data, error }] = useSaveLoanMutation();

  useEffect(() => {
    if (data?.saveLoan) {
      console.log('save loan', data?.saveLoan);
      setLoanId(data?.saveLoan);
      navigation.dispatch(StackActions.replace('LoanRequirementList'));
    }
  }, [data, navigation, setLoanId]);

  const onSubmit = useCallback(
    type => {
      setRequirementType(type);
      saveLoan({
        variables: {
          amount,
          totalInstallments,
          loanType,
          requirementType: type,
        },
      });
    },
    [amount, loanType, saveLoan, setRequirementType, totalInstallments],
  );

  function viewTypes(values) {
    return values.map(data => {
      return (
        <TouchableOpacity
          key={data.type}
          style={styles.incomeContainer}
          onPress={() => {
            onSubmit(data.type);
          }}>
          <Icon name={data.icon} style={styles.incomeIcon} type="material" />
          <View style={styles.incomeDescriptionContainer}>
            <Text style={styles.text}>{data.title}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textHeader}>
        Seleccione el tipo de documentos a presentar
      </Text>
      <Spacer />
      <View style={styles.options}>{viewTypes(types)}</View>
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

export default LoanRequirementTypeScreen;
