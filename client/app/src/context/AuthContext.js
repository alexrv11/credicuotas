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
    case 'signEmail':
      return { userEmail: action.payload };
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    default:
      return state;
  }
};

const signEmail = dispatch => async email => {
  try {
    await AsyncStorage.setItem('user-email', email);
    dispatch({ type: 'signEmail', payload: email });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'add_error', payload: error.message });
  }
};


export const { Provider: AuthProvider, Context: AuthContext } =
  createDataContext(
    authReducer,
    {
      signEmail,
    },
    { token: '', errorMessage: '', userId: '', userEmail: '' },
  );
