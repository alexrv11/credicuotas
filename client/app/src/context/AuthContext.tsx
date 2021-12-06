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

  const values = {
    error,
    token,
    userId,
    userEmail,
    setError,
    setToken,
    setUserId,
    setUserEmail,
  };

  return (
    <AuthContext.Provider value={{ ...values }}>
      {children}
    </AuthContext.Provider>
  );
}

export default React.memo(AuthProvider);
