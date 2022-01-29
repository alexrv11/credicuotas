import { useState, useCallback, useEffect } from 'react';
import PrimaryButton from 'components/PrimaryButton';
import { StackActions } from '@react-navigation/native';
import Spacer from 'components/Spacer';
import React from 'react';
import { SafeAreaView, StyleSheet, View, Platform } from 'react-native';
import { Input, Text, Image } from 'react-native-elements';
import Loading from 'components/Loading';
import { useLoan } from '../context/LoanContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PreviewDocumentScreen = ({ route, navigation }) => {
  const [name, setName] = useState('');
  const { loanId } = useLoan();
  const { requirementType } = route.params;
  const [loading, setLoading] = useState(false);
  const { uri } = route.params;

  const onSubmit = useCallback(async () => {
    setLoading(true);
    const data = new FormData();

    const uriFile = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    var filename = uri.replace(/^.*[\\\/]/, '');
    data.append('data', {
      name: filename,
      type: 'image',
      uri: uriFile,
    });

    data.append('loanId', loanId);
    data.append('requirementType', requirementType);

    const token = await AsyncStorage.getItem('token');

    await fetch('http://localhost:8282/upload-file', {
      method: 'post',
      body: data,
      headers: {
        'Content-Type': 'multipart/form-data; ',
        Authorization: `Bearer ${token}`,
      },
    });
    navigation.navigate('LoanRequirementList');
    setLoading(false);
  }, [uri, loanId, requirementType, navigation]);

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.description}>Guardando documento...</Text>
      </View>
      <View style={styles.form}>
        <Image source={{ uri }} style={styles.image} resizeMode="stretch" />
      </View>
      <View style={styles.footer}>
        <PrimaryButton onPress={onSubmit} text="Guardar" disabled={false} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
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
  description: {
    fontSize: 20,
    paddingHorizontal: 20,
    color: '#070D99',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    height: 400,
    width: 300,
  },
  footer: {
    width: '100%',
  },
});

export default PreviewDocumentScreen;
