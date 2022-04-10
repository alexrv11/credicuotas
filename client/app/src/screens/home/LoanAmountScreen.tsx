import { useState, useCallback, useEffect } from 'react';
import PrimaryButton from 'components/PrimaryButton';
import { StackActions } from '@react-navigation/native';
import Spacer from 'components/Spacer';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Input, Text, Image } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { useLoan } from 'context/LoanContext';

const LoanAmountScreen = ({ navigation }) => {
  const { setAmount, setTotalInstallments } = useLoan();
  const [loanAmount, setLoanAmount] = useState('');
  const [errorAmount, setErrorAmount] = useState('');
  const [loanTotalInstallments, setLoanTotalInstallments] = useState('');
  const [errorTotalInstallments, setErrorTotalInstallments] = useState('');
  const [disable, setDisable] = useState(true);

  const onSubmit = useCallback(() => {
    setAmount(loanAmount);
    setTotalInstallments(loanTotalInstallments);
    navigation.navigate('LoanIncomeType');
  }, [
    loanAmount,
    loanTotalInstallments,
    setAmount,
    setTotalInstallments,
    navigation,
  ]);

  useEffect(() => {
    if (loanAmount) {
      const amountNumber = Number(loanAmount);
      if (amountNumber < 500 || amountNumber > 14000) {
        setErrorAmount('El monto de ser de 500 hasta 14000bs');
        setDisable(true);
        return;
      }
      setErrorAmount('');
    }
    if (loanTotalInstallments) {
      const totalNumber = Number(loanTotalInstallments);
      if (totalNumber < 4 || totalNumber > 48) {
        setErrorTotalInstallments('El plazo debe ser de 4 hasta 48 meses');
        setDisable(true);
        return;
      }
      setErrorTotalInstallments('');
    }

    if (loanAmount && loanTotalInstallments) {
      setDisable(false);
    }
  }, [loanAmount, loanTotalInstallments]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.form} contentContainerStyle={styles.content}>
        <Text style={styles.inputLabel}>Monto del préstamo</Text>
        <Input
          placeholder="500 - 14000bs"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          leftIcon={{
            type: 'material',
            name: 'account-balance-wallet',
            color: '#070D99',
          }}
          value={loanAmount}
          onChangeText={setLoanAmount}
          keyboardType="number-pad"
        />
        <Text style={styles.inputError}>{errorAmount}</Text>
        <Spacer />
        <Text style={styles.inputLabel}>Plazo en meses</Text>
        <Input
          placeholder="4 - 48 meses"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          leftIcon={{ type: 'material', name: 'tag', color: '#070D99' }}
          value={loanTotalInstallments}
          onChangeText={setLoanTotalInstallments}
          keyboardType="number-pad"
        />
        <Text style={styles.inputError}>{errorTotalInstallments}</Text>
        <View style={styles.buttonContainer}>
          <PrimaryButton
            onPress={onSubmit}
            text="Continuar"
            disabled={disable}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '100%',
    flex: 4,
  },
  content: {
    flexGrow: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 50,
  },
  logo: {
    width: 90,
    height: 120,
  },
  text: {
    color: '#070D99',
  },
  inputLabel: {
    marginLeft: 12,
    marginBottom: 10,
    fontSize: 18,
    color: '#070D99',
  },
  inputError: {
    marginLeft: 12,
    marginBottom: 10,
    fontSize: 17,
    color: '#b81d08',
  },
  description: {
    fontSize: 18,
    paddingHorizontal: 20,
    color: '#0a1080',
    textAlign: 'center',
  },
  amount: {
    marginTop: 10,
    fontSize: 18,
    paddingHorizontal: 20,
    color: '#0a1080',
  },
  buttonContainer: {
    width: '100%',
  },
});

export default LoanAmountScreen;
