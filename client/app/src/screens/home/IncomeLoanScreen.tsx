import { useCallback, useEffect } from 'react';
import Spacer from 'components/Spacer';
import React from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { useLoan } from 'context/LoanContext';
import { StackActions } from '@react-navigation/native';
import { useGetLoanTypesQuery } from 'api/graphql/generated/graphql';
import Loading from 'components/Loading';
import { ScrollView } from 'react-native-gesture-handler';

const IncomeLoanScreen = ({ navigation }) => {
  const { setLoanType } = useLoan();

  const { data, error, loading } = useGetLoanTypesQuery();

  useEffect(() => {console.log(data)}, [data]);

  const onSubmit = useCallback(
    (loanType: String) => {
      setLoanType(loanType);
      navigation.dispatch(StackActions.replace('LoanRequirementType'));
    },
    [navigation, setLoanType],
  );

  if (loading) {
    return <Loading />;
  }

  const optionsView = options => {
    return options.map(option => {
      return (
        <TouchableOpacity
          style={styles.incomeContainer}
          onPress={() => {
            onSubmit(option?.id);
          }}>
          <View style={styles.incomeDescriptionContainer}>
            <Text style={styles.text}>{option?.name}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textHeader}>Seleccione el tipo de prestamo</Text>
      <Spacer />
      <ScrollView style={styles.options}>{optionsView(data?.getLoanTypes)}</ScrollView>
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
