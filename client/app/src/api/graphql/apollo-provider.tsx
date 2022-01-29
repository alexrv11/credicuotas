import React from 'react';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { setContext } from '@apollo/client/link/context';

export default function GraphqlProvider({ children }: PropsWithChildren<any>) {
  const httpLink = createHttpLink({
    uri: 'http://localhost:8282/graphql',
  });


  const authLink = setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = await AsyncStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );

    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const client = new ApolloClient({
    link: from([authLink, errorLink, httpLink]),
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
