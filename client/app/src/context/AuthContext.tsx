import React, { Dispatch, SetStateAction } from 'react';

export interface Auth {
  token?: string;
  setToken: Dispatch<SetStateAction<undefined>>;
  userId?: string;
  setUserId: Dispatch<SetStateAction<undefined>>;
  userEmail?: string;
  setUserEmail: Dispatch<SetStateAction<undefined>>;
  error?: any;
  setError: Dispatch<SetStateAction<undefined>>;
  setUserPhone: Dispatch<SetStateAction<undefined>>;
  userPhone?: string;
}

const AuthContext = React.createContext({} as Auth);

export function useAuth() {
  return React.useContext(AuthContext);
}

function AuthProvider({ children }: React.PropsWithChildren<any>) {
  const [error, setError] = React.useState();
  const [token, setToken] = React.useState();
  const [userId, setUserId] = React.useState();
  const [userEmail, setUserEmail] = React.useState();
  const [userPhone, setUserPhone] = React.useState();

  const values = {
    error,
    token,
    userId,
    userEmail,
    userPhone,
    setError,
    setToken,
    setUserId,
    setUserEmail,
    setUserPhone,
  };

  return (
    <AuthContext.Provider value={{ ...values }}>
      {children}
    </AuthContext.Provider>
  );
}

export default React.memo(AuthProvider);
