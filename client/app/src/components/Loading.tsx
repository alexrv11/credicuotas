import React from 'react';
import { SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';

const Loading = () => {
  return (
    <SafeAreaView style={styles.loader}>
      <ActivityIndicator size="small" color="#070D99" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loading;
