import React, { useCallback } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Avatar, Text, Icon } from 'react-native-elements';
import Spacer from 'components/Spacer';
import PrimaryButton from 'components/PrimaryButton';

const types = {
  OWN_BUSINESS: [
    {
      type: 'SIGNATURE_ACKNOWLEDGMENT',
      icon: 'group',
      title: 'Grupo de 4 a 6 personas',
      description: 'Reconocimiento de firmas',
    },
    {
      type: 'TWO_GUARANTEES',
      icon: 'account-balance',
      title: '2 garantes con negocio propio',
      descripcion: 'Reconocimiento de firmas',
    },
    { type: 'OWN_ASSET', icon: 'directions-car', title: 'Bienes Personales' },
  ],
  ONW_EMPLOYEE: [
    {
      type: 'TWO_GUARANTEES',
      icon: 'account-balance',
      title: '2 garantes con negocio propio',
      descripcion: 'Reconocimiento de firmas',
    },
    { type: 'OWN_ASSET', icon: 'directions-car', title: 'Bienes Personales' },
  ],
  PRIVATE_COMPANY_EMPLOYEE: [
    { type: 'LAST_INVOICE', icon: 'article', title: 'Ultima boleta de pago' },
    { type: 'OWN_ASSET', icon: 'directions-car', title: 'Bienes Personales' },
  ],
  PUBLIC_EMPLOYEE: [
    { type: 'LAST_INVOICE', icon: 'article', title: 'Ultima boleta de pago' },
    { type: 'OWN_ASSET', icon: 'directions-car', title: 'Bienes Personales' },
  ],
};

const LoanRequirementTypeScreen = ({ route, navigation }) => {
  const { incomeType } = route.params;

  const onSubmit = useCallback(
    type => {
      if (type === 'LAST_INVOICE' || type === 'OWN_ASSET') {
        navigation.navigate('LoanDocs', { type: type });
      }
    },
    [navigation],
  );

  function viewTypes(values) {
    return values.map(data => {
      return (
        <TouchableOpacity
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
      <View style={styles.options}>{viewTypes(types[incomeType])}</View>
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
