import React, { useCallback } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import Spacer from 'components/Spacer';
import PrimaryButton from 'components/PrimaryButton';
import { useGetRequirementsQuery } from '../api/graphql/generated/graphql';
import { useLoan } from 'context/LoanContext';
import { useEffect } from 'react';
import Loading from 'components/Loading';

const LoanRequirementListScreen = ({ route }) => {
  const { type } = route.params;
  const { loanId } = useLoan();

  const { data, error, loading } = useGetRequirementsQuery({
    variables: { loanId, type },
  });

  const onSubmit = useCallback(type => {
    console.log('contineuar test');
  }, []);

  useEffect(() => {
    console.log('get requirements', data, error);
  }, [data, error]);

  function viewRequirements(values) {
    if (!values) {
      return;
    }
    return values.map(requirement => {
      return (
        <View style={styles.incomeContainer} key={requirement.type}>
          <Icon
            name={requirement.status ? 'check-circle' : 'check-circle-outline'}
            style={styles.incomeIcon}
            type="material"
          />
          <View style={styles.incomeDescriptionContainer}>
            <Text style={styles.text}>{requirement?.title}</Text>
            <Text style={styles.description}>{requirement?.description}</Text>
          </View>
        </View>
      );
    });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textHeader}>
        Necesitamos que nos envies la siguiente informacion
      </Text>
      <Spacer />
      <View style={styles.options}>
        {viewRequirements(data?.getLoanRequirements)}
      </View>
      <View style={styles.footer}>
        <PrimaryButton onPress={onSubmit} text="Continuar" disabled={false} />
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
    marginTop: 10,
    backgroundColor: '#e8e8f1',
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
    color: '#080b69',
    fontSize: 17,
  },
  description: {
    color: '#0f14ad',
    fontSize: 14,
    marginTop: 5,
  },
  textHeader: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#05085e',
  },
  footer: {
    width: '100%',
  },
});

export default LoanRequirementListScreen;
