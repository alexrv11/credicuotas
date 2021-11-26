/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {useColorScheme} from 'react-native';
import MainNavigator from './navigation';

import magic from '@app/auth/magic-api';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <magic.Relayer />
      <MainNavigator/>
    </>
  );
};

export default App;
