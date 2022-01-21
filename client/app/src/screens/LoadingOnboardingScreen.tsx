import Loading from 'components/Loading';
import { StackActions } from '@react-navigation/native';
import React from 'react';
import { useOnboardingLazyQuery } from '../api/graphql/generated/graphql';
import { useEffect } from 'react';

const LoadingOnboardingScreen = ({ navigation }) => {
  const [onBoardingQuery, { data, loading }] = useOnboardingLazyQuery({
    fetchPolicy: "no-cache"
  });

  useEffect(() => {
    setTimeout(onBoardingQuery, 2000);
  }, [onBoardingQuery]);

  useEffect(() => {
    if (data?.onboarding === 'PENDING_PERSONAL_DATA') {
      navigation.dispatch(StackActions.replace('PersonalRegister'));
      return;
    }

    if (data?.onboarding === 'PENDING_PHONE_NUMBER') {
      navigation.dispatch(StackActions.replace('PhoneRegister'));
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
