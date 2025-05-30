import React, { createContext, useState, ReactNode, useContext } from 'react';

interface UserContextType {
  username: string;
  setUsername: (username: string) => void;
  isLoggedIn: boolean;
  login: (username: string) => void;
  logout: () => void;
  getTimelinePath: () => string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (username: string) => {
    setUsername(username);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUsername('');
    setIsLoggedIn(false);
  };

  const getTimelinePath = () => {
    if (username.endsWith('01')) {
      return '/journey/past';
    } else if (username.endsWith('02')) {
      return '/journey/future';
    }
    // Default to past timeline if no matching pattern
    return '/journey/past';
  };

  return (
    <UserContext.Provider value={{ username, setUsername, isLoggedIn, login, logout, getTimelinePath }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};