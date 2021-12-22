import Loading from 'components/Loading';
import { StackActions } from '@react-navigation/native';
import React from 'react';
import { useOnboardingQuery } from '../api/graphql/generated/graphql';
import { useEffect } from 'react';

const LoadingOnboardingScreen = ({ navigation }) => {
  const {data, loading } = useOnboardingQuery();

  useEffect(() => {
    console.log('onboarding status', data, loading);
    if (data?.onboarding === 'PENDING_PERSONAL_DATA') {
      navigation.dispatch(StackActions.replace('PersonalRegister'));
      return;
    }

    if (data?.onboarding === 'COMPLETE') {
      navigation.dispatch(StackActions.replace('MainFlow'));
      return;
    }
  }, [data, loading, navigation]);

  return <Loading />;
};

export default LoadingOnboardingScreen;
