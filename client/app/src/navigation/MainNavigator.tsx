import React, { memo } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Icon } from 'react-native-elements';

import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import LoanScreen from '../screens/LoanScreen';
import ProfileScreen from '../screens/ProfileScreen';
import VerifySignInCodeScreen from 'screens/VerifySignInCodeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import InstructionUploadCIScreen from '../screens/InstructionUploadCIScreen';
import CameraCaptureScreen from '../screens/CameraScan';
import LoadingOnboardingScreen from 'screens/LoadingOnboardingScreen';
import RegisterPhoneScreen from 'screens/RegisterPhoneScreen';
import VerifyPhoneCodeScreen from 'screens/VerifyPhoneCodeScreen';

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
      <OnboardingStack.Screen
        name="CameraScan"
        component={CameraCaptureScreen}
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
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <MainStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ size, focused }: any) => (
            <Icon
              name="home"
              size={size || 32}
              style={{
                color: focused ? '#032924' : '#000000',
              }}
            />
          ),
        }}
      />
      <MainStack.Screen
        name="Loan"
        component={LoanScreen}
        options={{
          tabBarIcon: ({ size, focused }: any) => (
            <Icon
              name="payment"
              size={size || 32}
              style={{
                color: focused ? '#032924' : '#000000',
              }}
            />
          ),
        }}
      />

      <MainStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ size, focused }: any) => (
            <Icon
              name="account-circle"
              size={size || 32}
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
  return (
    <NavigationContainer>
      <AppStack.Navigator
        initialRouteName="SignInFlow"
        screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="SignInFlow" component={SignInFlow} />
        <AppStack.Screen name="MainFlow" component={MainFlow} />
        <AppStack.Screen name="OnboardingFlow" component={OnboardingFlow} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default memo(MainNavigator);
