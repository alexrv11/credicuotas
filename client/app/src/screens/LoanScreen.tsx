import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';

const LoanScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textStatus}>APPROVED</Text>
      </View>
      <View style={styles.loanContainer}>
        <View style={styles.details}>
          <Text style={styles.titleDetails}>Total Prestamo</Text>
          <View style={styles.amountContainer}>
            <Text>bs</Text>
            <Text style={styles.amount}>10.000</Text>
          </View>
          <Text style={styles.rateTitle}>Interes</Text>
          <View style={styles.rateContainer}>
            <Text>10%</Text>
            <Text style={styles.rate}>1.000</Text>
          </View>
        </View>
        <View style={styles.installments}>
          <Text style={styles.installmentTitle}>Cuotas</Text>
          <Text style={styles.installmentsValue}>4/10</Text>
        </View>
      </View>
      <View style={styles.nextInstallments}>
        <Icon name="business" style={styles.incomeIcon} type="material" />
        <Text style={styles.installmentsTitle}>Proxima cuota 1/10</Text>
      </View>
      <View style={styles.documents}>
        <Text style={styles.documentTitle}>Documentos</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  header: {
    justifyContent: 'center',
    marginTop: 50,
    width: '100%',
  },
  installmentsTitle: {
    marginLeft: 10,
  },
  loanContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
    backgroundColor: '#a2a5e9',
    borderRadius: 5,
  },
  titleDetails: {
    padding: 10,
    fontSize: 17,
  },
  amountContainer: {
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 15,
  },
  amount: {
    fontSize: 20,
    paddingLeft: 5,
  },
  details: {
    padding: 10,
    flex: 1.8,
  },
  rateTitle: {
    padding: 10,
    fontSize: 17,
  },
  rateContainer: {
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 15,
  },
  rate: {
    paddingLeft: 10,
  },
  installments: {
    flex: 1.2,
    padding: 10,
    alignItems: 'center',
  },
  installmentTitle: {
    padding: 10,
    fontSize: 18,
  },
  installmentsValue: {
    fontSize: 20,
  },
  nextInstallments: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#c1c2eb',
    width: '100%',
    padding: 10,
    borderRadius: 5,
  },
  documents: {
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: 20,
  },
  incomeIcon: {
    color: '#070D99',
    marginLeft: 25,
  },
  text: {
    color: '#070D99',
  },
  textStatus: {
    fontSize: 20,
    color: '#0d8613',
    fontWeight: 'bold',
  },
  documentTitle: {
    fontSize: 20,
    color: '#0c0f69',
  },
});

export default LoanScreen;
