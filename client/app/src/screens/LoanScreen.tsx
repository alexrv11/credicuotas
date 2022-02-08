import { StackActions } from '@react-navigation/native';
import Loading from 'components/Loading';
import { useLoan } from 'context/LoanContext';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { useGetLoanQuery } from '../api/graphql/generated/graphql';

const LoanScreen = ({ navigation }) => {
  const { data, error, loading } = useGetLoanQuery();
  const { setLoanId, setRequirementType } = useLoan();

  useEffect(() => {
    setLoanId(data?.getLoan.id);
    setRequirementType(data?.getLoan.requirementType);
  }, [data?.getLoan, setLoanId, setRequirementType]);

  if (loading) {
    return <Loading />;
  }

  const getStatusDescriptionView = (loan, callback) => {
    let description = '';
    if (loan?.status === 'REGISTERED') {
      description = 'Estamos analizando su solicitud';
    }

    if (loan?.status === 'HAS_OBSERVATION') {
      description = loan.observation;
      return (
        <View style={styles.containerStatus}>
          <Text style={styles.descriptionStatus}>{description}</Text>
          <TouchableOpacity
            style={styles.buttonReview}
            onPress={() => navigation.navigate('LoanRequirementList')}>
            <Text>Revisar</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.containerStatus}>
        <Text style={styles.descriptionStatus}>{description}</Text>
      </View>
    );
  };

  const documentView = documents => {
    if (!documents) {
      return;
    }
    return documents.map(doc => {
      const desc = doc?.description.split('-');
      return (
        <View key={doc.id} style={styles.documentItem}>
          <View>
            <Text style={styles.documentItemDescription}>{desc[0]}</Text>
            {desc[1] ? (
              <Text style={styles.documentItemDescription}>{desc[1]}</Text>
            ) : (
              <></>
            )}
          </View>
          <Text
            style={styles.documentItemDescriptionVer}
            onPress={() => console.log('hello', doc)}>
            ver
          </Text>
        </View>
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textStatus}>
          {data?.getLoan?.statusDescription}
        </Text>
        {getStatusDescriptionView(data?.getLoan)}
      </View>
      <View style={styles.loanContainer}>
        <View style={styles.details}>
          <Text style={styles.titleDetails}>Total Prestamo</Text>
          <View style={styles.amountContainer}>
            <Text>bs</Text>
            <Text style={styles.amount}>{data?.getLoan?.amount}</Text>
          </View>
          <Text style={styles.rateTitle}>Interes</Text>
          <View style={styles.rateContainer}>
            <Text>{data?.getLoan?.ratePercentage}</Text>
            <Text style={styles.rate}>{data?.getLoan?.rateAmount}</Text>
          </View>
        </View>
        <View style={styles.installments}>
          <Text style={styles.installmentTitle}>Cuotas</Text>
          <Text style={styles.installmentsValue}>
            {data?.getLoan?.totalInstallments}
          </Text>
        </View>
      </View>
      <View style={styles.documents}>
        <Text style={styles.documentTitle}>Documentos</Text>
        <View style={styles.docs}>
          {documentView(data?.getLoan?.documents)}
        </View>
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
    height: 60,
    justifyContent: 'center',
    marginTop: 50,
    width: '100%',
    flexDirection: 'column',
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
  containerStatus: {
    flex: 1,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  descriptionStatus: {
    fontSize: 16,
    flex: 1,
    flexWrap: 'wrap',
    color: '#03064e',
  },
  docs: {
    marginTop: 10,
  },
  documentItem: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    padding: 10,
    backgroundColor: '#eaeaf5',
  },
  documentItemDescription: {
    fontSize: 17,
    color: '#070D99',
  },
  documentItemDescriptionVer: {
    fontSize: 17,
    color: '#070D99',
    textDecorationLine: 'underline',
  },
  buttonReview: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});

export default LoanScreen;
