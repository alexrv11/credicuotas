import React, { useCallback } from 'react';

import { StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';

const Camera = ({ afterTakePicture }) => {
  let camera;

  const takePicture = useCallback(async () => {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);
      console.log('data fileName', data.fileName);
      console.log('data type', data.type);
      if (afterTakePicture) {
        afterTakePicture(data.uri);
      }
    }
  }, [afterTakePicture, camera]);

  return (
    <RNCamera
      ref={(ref) => {
        camera = ref;
      }}
      captureAudio={false}
      style={styles.camera}
      type={RNCamera.Constants.Type.back}
      androidCameraPermissionOptions={{
        title: 'Permiso para usar la camara',
        message: 'Necesitamos permiso para acceder a la camara',
        buttonPositive: 'Aceptar',
        buttonNegative: 'Cancelar',
      }}>
      <TouchableOpacity style={styles.capture} onPress={takePicture}>
        <Icon name="camera" type="material" size={50} />
      </TouchableOpacity>
    </RNCamera>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    alignSelf: 'center',
    margin: 20,
  },
});

export default Camera;
