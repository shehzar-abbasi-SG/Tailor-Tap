import { useNavigation, useRoute } from '@react-navigation/native';
import React, { createContext, useContext, useState } from 'react';
import { MeasurementStackParamList } from '../types/navigation';
import { measurementRoutes } from '@/app/constant/measurement';
import { StackNavigationProp } from '@react-navigation/stack';

type ClientDetailFormData = {
    fullName: string;
    cast: string;
    phoneNumber: string;
    address:string
    length:string;
    shoulder:string
    arms:string;
    cuffs:string;
    collar:string
    chest:string;
    fitting:string;
    lap:string;
    pant:string;
    paincha:string;
    additionalInformation:string
};

type FormContextType = {
  formData: ClientDetailFormData;
  setFormData: React.Dispatch<React.SetStateAction<ClientDetailFormData>>;
  goNext:(_currentScreen: keyof MeasurementStackParamList)=>void
};

export type PartialClientDetailFormData =  Partial<ClientDetailFormData>
const ClientDetailFormContext = createContext<FormContextType | undefined>(undefined);

export const ClientDetailFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<ClientDetailFormData>({
    fullName: '',
    cast: '',
    phoneNumber: '',
    address:"",
    length:"",
    shoulder:"",
    arms:"",
    cuffs:"",
    collar:"",
    chest:"",
    fitting:"",
    lap:"",
    pant:"",
    paincha:"",
    additionalInformation:""
  });
  const navigation = useNavigation<StackNavigationProp<MeasurementStackParamList>>();

  const goNext = (currentScreen: keyof MeasurementStackParamList) => {
    const currentIndex = measurementRoutes.indexOf(currentScreen);
    if (currentIndex >= 0 && currentIndex < measurementRoutes.length - 1) {
      const nextScreen = measurementRoutes[currentIndex + 1];
      navigation.navigate(nextScreen);
    } else {
      console.warn("No next screen available.");
    }
  };


  return (
    <ClientDetailFormContext.Provider value={{ formData, setFormData,goNext }}>
      {children}
    </ClientDetailFormContext.Provider>
  );
};

export const useClientDetailFormContext = () => {
  const context = useContext(ClientDetailFormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
