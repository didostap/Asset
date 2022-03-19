import React from 'react';
import { useCurrentUserQuery, User } from '../generated/graphql';

interface IAuthContext {
  isUser?: boolean;
  user?: User | null;
}

const AuthContext = React.createContext<IAuthContext>({});

export const AuthProvider: React.FC = ({ children }) => {
  const { data, loading } = useCurrentUserQuery();

  const value = {
    user: data?.currentUser,
    isUser: loading ? true : !!data?.currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);
