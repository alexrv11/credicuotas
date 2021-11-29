import { Magic } from '@magic-sdk/react-native';
import { MAGIC_API_KEY } from 'env';

const magic = new Magic(MAGIC_API_KEY, {
  locale: 'es',
});

export async function login(email?: string): Promise<string> {
  
};

export async function logout() {
  try {
    

  } catch (error) {
  }
};

export default magic;
