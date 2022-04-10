import { useGetUserQuery, useLogoutMutation } from 'api/graphql/generated/graphql';
import Loading from 'components/Loading';
import Spacer from 'components/Spacer';
import React, { useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Icon, Text } from 'react-native-elements';
import navigation from 'navigation';
import { StackActions } from '@react-navigation/native';

const ProfileScreen = ({ navigation }) => {
  const { data, error, loading } = useGetUserQuery();
  const [logout, { dataLogout, errorLogout }] = useLogoutMutation();

  if (loading) {
    return <Loading />;
  }

  const handleLogout = () => {
    logout();
    navigation.dispatch(StackActions.replace('SignInFlow'));
  };

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
        <Text>{data?.getUser.name}</Text>
        <Text style={styles.email}>{data?.getUser.email}</Text>
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
          <TouchableOpacity style={styles.row} onPress={handleLogout}>
            <Icon name="logout" style={styles.icon} type="material" />
            <View style={styles.option}>
              <Text>Cerrar Sesión</Text>
            </View>
          </TouchableOpacity>
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
