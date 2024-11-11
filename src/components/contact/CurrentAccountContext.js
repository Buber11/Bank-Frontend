import React, { createContext, useContext, useState } from 'react';

const CurrentAccountContext = createContext(null);

export const useCurrentAccount = () => {
    return useContext(CurrentAccountContext);
};

export const CurrentAccountProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState(null);

    return (
        <CurrentAccountContext.Provider value={{ currentAccount, setCurrentAccount }}>
            {children}
        </CurrentAccountContext.Provider>
    );
};