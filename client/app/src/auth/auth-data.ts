import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN_KEY = 'access_token_key';

export const storeData = async (value: string) => {
  console.log('setting access token into data store');
  try {
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, value);
  } catch (e) {
    console.error(e);
  }
};

export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);

    if (value !== null) {
      return value;
    }
  } catch (e) {
    return null;
  }
};

export const clearData = async () => {
  await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
};

export const isLoggedIn = async () => {
  if ((await getData()) != null) {
    return true;
  }
  return false;
};
