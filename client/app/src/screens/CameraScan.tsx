import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Camera from '../components/Camera';

const CameraCaptureScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Camera afterTakePicture={() => console.log('hello camera')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CameraCaptureScreen;
