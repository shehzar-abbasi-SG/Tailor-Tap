import React, { createContext, useContext, useState } from 'react';

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

  return (
    <ClientDetailFormContext.Provider value={{ formData, setFormData }}>
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
