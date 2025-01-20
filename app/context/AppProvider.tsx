import React, { createContext, useContext, useEffect, useState } from 'react';
import { I18n } from "i18n-js"
import { translation} from "@/localization";
import { getLocales } from "expo-localization";
import { getLanguagePreference, saveLanguagePreference } from '../utils/language';

type AppContextType = {
  showUpgradeModal: boolean;
  setShowUpgradeModal: React.Dispatch<React.SetStateAction<boolean>>
  isAuthenticated:boolean;
  setIsAuthenticated:React.Dispatch<React.SetStateAction<boolean>>
  showUpgradeStack: boolean
  setShowUpgradeStack: React.Dispatch<React.SetStateAction<boolean>>
  isLoading:boolean;
  changeLanguage:(x:'en'|'sd'|'ur') => void
  i18n:I18n,
  locale:string
};

export const rtlLanguages = ['ur', 'sd'];
const i18n = new I18n(translation);

i18n.defaultLocale = 'en'; 
i18n.locale = getLocales()[0].languageCode || 'en'; 
i18n.enableFallback=true

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // This will control routing 
  const [showUpgradeStack, setShowUpgradeStack] = useState(false)
  const [isLoading,setIsLoading] = useState(false)
  const [locale,setLocale] = useState(i18n.locale)

  const changeLanguage = (languageCode:"ur"|"sd"|'en') => {
    i18n.locale = languageCode;
    setLocale(languageCode)
    saveLanguagePreference(languageCode)
  };
  
  useEffect(()=>{
    if(!showUpgradeStack) setShowUpgradeModal(false)
  },[showUpgradeStack])


  return (
    <AppContext.Provider value={{changeLanguage, locale,i18n, showUpgradeModal, setShowUpgradeModal,isAuthenticated,setIsAuthenticated,showUpgradeStack,setShowUpgradeStack,isLoading }}>
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
