import React, { memo, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Icon } from 'react-native-elements';

import HomeScreen from 'screens/home/HomeScreen';
import SignInScreen from 'screens/SignInScreen';
import LoanScreen from 'screens/LoanScreen';
import ProfileScreen from 'screens/ProfileScreen';
import VerifySignInCodeScreen from 'screens/VerifySignInCodeScreen';
import RegisterScreen from 'screens/RegisterScreen';
import InstructionUploadCIScreen from 'screens/InstructionUploadCIScreen';
import CameraCaptureScreen from 'screens/CameraScan';
import LoadingOnboardingScreen from 'screens/LoadingOnboardingScreen';
import RegisterPhoneScreen from 'screens/RegisterPhoneScreen';
import VerifyPhoneCodeScreen from 'screens/VerifyPhoneCodeScreen';
import LoanAmountScreen from 'screens/home/LoanAmountScreen';
import IncomeLoanScreen from 'screens/home/IncomeLoanScreen';
import PreviewDocumentScreen from '../screens/PreviewDocument';
import LoanRequirementTypeScreen from 'screens/LoanRequirementTypeScreen';
import LoanDocsScreen from 'screens/LoanDocsScreen';
import LoanRequirementListScreen from 'screens/LoanRequirementListScreen';
import { useGetUserQuery } from '../api/graphql/generated/graphql';
import Loading from 'components/Loading';
import LoanCompletedScreen from 'screens/LoanCompletedScreen';

const AppStack = createNativeStackNavigator();

const SignInStack = createNativeStackNavigator();

const SignInFlow = () => {
  return (
    <SignInStack.Navigator initialRouteName="SignIn">
      <SignInStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <SignInStack.Screen
        name="VerifyCode"
        component={VerifySignInCodeScreen}
        options={{
          title: '',
        }}
      />
    </SignInStack.Navigator>
  );
};

const RegisterLoanStack = createNativeStackNavigator();

const RegisterLoanFlow = () => {
  return (
    <RegisterLoanStack.Navigator
      initialRouteName="LoanAmount"
      screenOptions={{
        headerShown: true,
      }}>
      <RegisterLoanStack.Screen
        name="LoanAmount"
        component={LoanAmountScreen}
        options={{
          title: '',
        }}
      />
      <RegisterLoanStack.Screen
        name="LoanIncomeType"
        component={IncomeLoanScreen}
        options={{
          title: '',
        }}
      />
      <RegisterLoanStack.Screen
        name="LoanRequirementType"
        component={LoanRequirementTypeScreen}
        options={{
          title: '',
        }}
      />
      <RegisterLoanStack.Screen
        name="PreviewDocument"
        component={PreviewDocumentScreen}
        options={{
          title: '',
        }}
      />
      <RegisterLoanStack.Screen
        name="CameraScan"
        component={CameraCaptureScreen}
        options={{
          title: '',
        }}
      />
      <RegisterLoanStack.Screen
        name="LoanDocs"
        component={LoanDocsScreen}
        options={{
          title: '',
        }}
      />
      <RegisterLoanStack.Screen
        name="LoanRequirementList"
        component={LoanRequirementListScreen}
        options={{
          title: '',
        }}
      />
      <RegisterLoanStack.Screen
        name="LoanCompleted"
        component={LoanCompletedScreen}
        options={{
          title: '',
        }}
      />
    </RegisterLoanStack.Navigator>
  );
};

const OnboardingStack = createNativeStackNavigator();

const OnboardingFlow = () => {
  return (
    <OnboardingStack.Navigator initialRouteName="LoadingOnboarding">
      <OnboardingStack.Screen
        name="LoadingOnboarding"
        component={LoadingOnboardingScreen}
        options={{
          title: '',
        }}
      />
      <OnboardingStack.Screen
        name="PersonalRegister"
        component={RegisterScreen}
        options={{
          title: '',
        }}
      />
      <OnboardingStack.Screen
        name="PhoneRegister"
        component={RegisterPhoneScreen}
        options={{
          title: '',
        }}
      />
      <OnboardingStack.Screen
        name="VerifyPhoneCode"
        component={VerifyPhoneCodeScreen}
        options={{
          title: '',
        }}
      />
      <OnboardingStack.Screen
        name="InstructionCI"
        component={InstructionUploadCIScreen}
        options={{
          title: '',
        }}
      />
    </OnboardingStack.Navigator>
  );
};

const MainStack = createBottomTabNavigator();

const MainFlow = () => {
  return (
    <MainStack.Navigator
      initialRouteName="Prestamo"
      screenOptions={{
        headerShown: false,
      }}>
      <MainStack.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ size, focused }: any) => (
            <Icon
              name="home"
              size={size || 32}
              color={focused ? '#050753' : '#070D99'}
              style={{
                color: focused ? '#032924' : '#000000',
              }}
            />
          ),
        }}
      />
      <MainStack.Screen
        name="Prestamo"
        component={LoanScreen}
        options={{
          tabBarIcon: ({ size, focused }: any) => (
            <Icon
              name="payment"
              size={size || 32}
              color={focused ? '#050753' : '#070D99'}
              style={{
                color: focused ? '#050753' : '#070D99',
              }}
            />
          ),
        }}
      />

      <MainStack.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ size, focused }: any) => (
            <Icon
              name="account-circle"
              size={size || 32}
              color={focused ? '#050753' : '#070D99'}
              style={{
                color: focused ? '#032924' : '#000000',
              }}
            />
          ),
        }}
      />
    </MainStack.Navigator>
  );
};

const MainNavigator = () => {
  const { error, loading } = useGetUserQuery();

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <AppStack.Navigator
        initialRouteName={error ? 'SignInFlow' : 'MainFlow'}
        screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="SignInFlow" component={SignInFlow} />
        <AppStack.Screen name="OnboardingFlow" component={OnboardingFlow} />
        <AppStack.Screen name="MainFlow" component={MainFlow} />
        <AppStack.Screen name="RegisterLoanFlow" component={RegisterLoanFlow} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default memo(MainNavigator);
