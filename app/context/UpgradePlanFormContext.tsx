import { useNavigation, useRoute } from '@react-navigation/native';
import React, { createContext, useContext, useState } from 'react';
import { MeasurementStackParamList } from '../types/navigation';
import { measurementRoutes } from '@/app/constant/measurement';
import { StackNavigationProp } from '@react-navigation/stack';

type UpgradeFormData = {
    selectedPlan: string
    selectedBankAccount: string
    transactionId: string
    image: string|null
}

type FormContextType = {
  formData: UpgradeFormData;
  setFormData: React.Dispatch<React.SetStateAction<UpgradeFormData>>;
};

export type PartialUpgradeFormData =  Partial<UpgradeFormData>
const UpgradePlanFormContext = createContext<FormContextType | undefined>(undefined);

export const UpgradePlanFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<UpgradeFormData>({
    selectedPlan: "",
    selectedBankAccount: "",
    transactionId: "",
    image: null,
  });
  const navigation = useNavigation<StackNavigationProp<MeasurementStackParamList>>();


  return (
    <UpgradePlanFormContext.Provider value={{ formData, setFormData }}>
      {children}
    </UpgradePlanFormContext.Provider>
  );
};

export const useUpgradePlanFormContext = () => {
  const context = useContext(UpgradePlanFormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
