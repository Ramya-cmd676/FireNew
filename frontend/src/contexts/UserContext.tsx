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
  const [username, setUsername] = useState(() => localStorage.getItem('username') || '');
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');

  const login = (username: string) => {
    setUsername(username);
    setIsLoggedIn(true);
    localStorage.setItem('username', username);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = () => {
    setUsername('');
    setIsLoggedIn(false);
    localStorage.removeItem('username');
    localStorage.removeItem('isLoggedIn');
  };

  const getTimelinePath = () => {
    if (username.endsWith('01')) {
      return '/journey/past';
    } else if (username.endsWith('02')) {
      return '/journey/future';
    }
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