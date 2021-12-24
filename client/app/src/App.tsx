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
import MainNavigator from './navigation';

import GraphqlProvider from 'api/graphql/apollo-provider';
import AuthProvider from 'context/AuthContext';
import LoanProvider from 'context/LoanContext';

const App = () => {
  return (
    <GraphqlProvider>
      <AuthProvider>
        <LoanProvider>
          <MainNavigator />
        </LoanProvider>
      </AuthProvider>
    </GraphqlProvider>
  );
};

export default App;
