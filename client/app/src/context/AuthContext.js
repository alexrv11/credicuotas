import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSignInByEmailMutation } from 'api/graphql/generated/graphql';
import createDataContext from './createDataContext';

export interface Follows {
  profileID?: string;
  setProfileID: Dispatch<SetStateAction<undefined>>;
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'signin':
      return { errorMessage: '', token: action.payload };
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    default:
      return state;
  }
};

const signin = dispatch => async email => {
  try {
    const response = { data: { token: 'mock-token' } };
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({ type: 'signin', payload: response.data.token });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'add_error', payload: error.message });
  }
};

export const { Provider: AuthProvider, Context: AuthContext } =
  createDataContext(
    authReducer,
    {
      signin,
    },
    { token: '', errorMessage: '', userId: '', userEmail: 'alex.rv11@gmaial' },
  );
