import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

export default function GraphqlProvider({ children }: PropsWithChildren<any>) {
  const client = new ApolloClient({
    uri: 'http://localhost:8181/graphql',
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
