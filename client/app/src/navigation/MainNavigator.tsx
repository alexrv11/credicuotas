import React, { memo } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Icon } from 'react-native-elements';

import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import LoanScreen from '../screens/LoanScreen';
import ProfileScreen from '../screens/ProfileScreen';

const AppStack = createNativeStackNavigator();

const SignInStack = createNativeStackNavigator();

const DEFAULT_SCREEN_OPTIONS = {
  headerShown: false,
};

const SignInFlow = () => {
  return (
    <SignInStack.Navigator initialRouteName="SignIn">
      <SignInStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={DEFAULT_SCREEN_OPTIONS}
      />
    </SignInStack.Navigator>
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
        initialRouteName="MainFlow"
        screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="SignInFlow" component={SignInFlow} />
        <AppStack.Screen name="MainFlow" component={MainFlow} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default memo(MainNavigator);
