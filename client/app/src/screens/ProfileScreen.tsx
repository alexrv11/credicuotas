import Spacer from 'components/Spacer';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Icon, Text } from 'react-native-elements';

const ProfileScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.header}>
        <Avatar
          size={84}
          rounded
          source={{ uri: 'https://randomuser.me/api/portraits/women/57.jpg' }}
          title="Bj"
          containerStyle={{ backgroundColor: 'grey' }}>
          <Avatar.Accessory size={26} />
        </Avatar>
        <Spacer />
        <Text>Elizabeth Gonzales</Text>
        <Text style={styles.email}>eli.gonzales@gmail.com</Text>
        <View style={styles.options}>
          <View style={styles.row}>
            <Icon name="person" style={styles.icon} type="material" />
            <View style={styles.option}>
              <Text>Datos Personales</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Icon name="folder" style={styles.icon} type="material" />
            <View style={styles.option}>
              <Text>Documentos</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Icon name="group-work" style={styles.icon} type="material" />
            <View style={styles.option}>
              <Text>Garantes</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Icon name="logout" style={styles.icon} type="material" />
            <View style={styles.option}>
              <Text>Cerrar Sesión</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  email: {
    marginTop: 5,
  },
  icon: {},
  option: {
    marginLeft: 15,
  },
  options: {
    marginTop: 60,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    marginLeft: 40,
    marginTop: 5,
    alignItems: 'center',
  },
});

export default ProfileScreen;
