import React, { createContext, useContext, useState } from 'react';

// Tworzymy kontekst autoryzacji
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);


  const login = (userRole) => {
    setIsLoggedIn(true);
    setRole(userRole); 
  };

  const logout = () => {
    setIsLoggedIn(false);
    setRole(null); 
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook do użycia AuthContext w komponentach
export const useAuth = () => useContext(AuthContext);