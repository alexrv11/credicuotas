import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const AuthReactContext = React.createContext({ loading: false, isLoggedIn: false });

export function useAuth() {
    return React.useContext(AuthReactContext);
}

function AuthProvider({ children }) {
    const location = useLocation();

    /*
    const { loading, data, refetch } = useGetUserTypeNameQuery({
    onCompleted({ userInfo }) {
      if (userInfo.__typename === 'Guest' && magicCredential) {
        const isServer = getIsServer();

        if (!isServer) {
          if (provider === 'google') {
            loginOauthGoogleRedirect();
            return;
          }

          loginWithCredential(magicCredential).catch(handleError);
        }
      }
    },
    onError(error) {
      logGqlError('Error while getting user info AuthProvider', error);
      enqueueGqlErrorSnackbar(error);
      handleError(error);
    },
  });
  */

    const buildAuthValue = (isLoading, data) => ({
        loading: false,
        isLoggedIn: false
    });

    const authValue = useMemo(() => buildAuthValue(false, {}), []);

    return <AuthReactContext.Provider value={authValue}>{children}</AuthReactContext.Provider>;
}

export default React.memo(AuthProvider);
