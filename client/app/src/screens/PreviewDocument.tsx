import { useState, useCallback, useEffect } from 'react';
import PrimaryButton from 'components/PrimaryButton';
import { StackActions } from '@react-navigation/native';
import Spacer from 'components/Spacer';
import React from 'react';
import { SafeAreaView, StyleSheet, View, ImageBackground } from 'react-native';
import { Input, Text, Image } from 'react-native-elements';
import Loading from 'components/Loading';
import { useSaveUserMutation } from '../api/graphql/generated/graphql';

const PreviewDocumentScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [identifierNumber, setIdentifierNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);

  const [saveUserInfo, { data }] = useSaveUserMutation({
    variables: { name, identifierNumber },
  });

  const onSubmit = useCallback(() => {
    saveUserInfo();
  }, [saveUserInfo]);

  useEffect(() => {
    if (data?.saveUserInfo === true) {
      navigation.dispatch(StackActions.replace('LoadingOnboarding'));
    }
  }, [data, navigation]);

  useEffect(() => {
    if (name && identifierNumber) {
      setDisable(false);
    }
  }, [name, identifierNumber]);

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.description}>Guardando documento...</Text>
      </View>
      <View style={styles.form}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.image}
          resizeMode="stretch"
        />
      </View>
      <View style={styles.footer}>
      <PrimaryButton onPress={onSubmit} text="Guardar" disabled={disable} />
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
