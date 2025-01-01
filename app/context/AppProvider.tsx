import React, { createContext, useContext, useState } from 'react';

type AppContextType = {
  showUpgradeModal: boolean;
  setShowUpgradeModal: React.Dispatch<React.SetStateAction<boolean>>
  isAuthenticated:boolean;
  setIsAuthenticated:React.Dispatch<React.SetStateAction<boolean>>
  showUpgradeStack: boolean
  setShowUpgradeStack: React.Dispatch<React.SetStateAction<boolean>>
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // This will control routing 
  const [showUpgradeStack, setShowUpgradeStack] = useState(false)


  return (
    <AppContext.Provider value={{ showUpgradeModal, setShowUpgradeModal,isAuthenticated,setIsAuthenticated,showUpgradeStack,setShowUpgradeStack }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
