import React, { createContext, useState, useEffect, useContext } from 'react';
import { api } from '@/app/config/api';
import { BaseResponse } from '../types';
import { AxiosError } from 'axios';
import { useCustomToast } from '../components/common/Toast';
import { CustomerDetails, CustomerSummary } from '../types/customer';
import { ClientDetailFormData, ClientUpdateFormData } from './FormContext';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp, SearchScreenNavigationProp } from '../types/navigation';

interface CustomerContextProps {
  getCustomers: () => Promise<void>;
  getCustomerById: (customerId: string,isEditMode:boolean) => Promise<void>;
  createCustomer: (customerData: ClientDetailFormData) => Promise<void>;
  updateCustomer: (customerId: string, updates: Partial<ClientUpdateFormData>,files?:File[]|null) => Promise<void>;
  deleteCustomer: (customerId: string) => Promise<void>;
  customers: CustomerSummary[] | null;
  selectedCustomer: CustomerDetails | null;
  isCustomerLoading: boolean;
  searchCustomers: (query: string) => Promise<void>;
  filteredCustomers: CustomerSummary[] | null;
  setFilteredCustomers: React.Dispatch<React.SetStateAction<CustomerSummary[] | null>>
  deleteCustomerImage: (customerId: string, imageUrl: string) => Promise<void>
  isCustomerDetailLoading: boolean
}


const CustomerContext = createContext<CustomerContextProps | undefined>(undefined);

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useCustomToast();
  const [customers, setCustomers] = useState<CustomerSummary[] | null>(null);
  const [filteredCustomers, setFilteredCustomers] = useState<CustomerSummary[] | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerDetails | null>(null);
  const [isCustomerLoading, setIsCustomerLoading] = useState(false);
  const [isCustomerDetailLoading,setIsCustomerDetailLoading] = useState(false)
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const mainNavigation = useNavigation<any>();
  const searchNavigation = useNavigation<SearchScreenNavigationProp>();


  const getCustomers = async (): Promise<void> => {
    try {
      setIsCustomerLoading(true);
      const response = await api.get<BaseResponse<CustomerSummary[]>>('/customer/customers');
      const { success, data, message } = response.data;
      if (!success) {
        showToast({ type: 'error', message: message ?? 'Failed to fetch customers' });
        return;
      }
      setCustomers(data);
    } catch (error) {
      handleError(error, 'Failed to fetch customers');
    } finally {
      setIsCustomerLoading(false);
    }
  };

  const getCustomerById = async (customerId: string,isEditMode:boolean): Promise<void> => {
    try {
      setIsCustomerDetailLoading(true);
      const response = await api.get<BaseResponse<CustomerDetails>>(`/customer/${customerId}`);
      const { success, data, message } = response.data;
      if (!success) {
        showToast({ type: 'error', message: message ?? 'Failed to fetch customer details' });
        return;
      }
      setSelectedCustomer(data);
      mainNavigation.navigate('Search',{screen:'EditDetail',params:{isEditMode}})
    } catch (error) {
      handleError(error, 'Failed to fetch customer details');
    } finally {
      setIsCustomerDetailLoading(false);
    }
  };

  const createCustomer = async (customerData: ClientDetailFormData): Promise<void> => {
    try {
      setIsCustomerLoading(true);
      const formData = new FormData();
      Object.entries(customerData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => formData.append(key, item)); 
        } else if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });
      
      const response = await api.post<BaseResponse<CustomerDetails>>('/customer/customers',  formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      const { success, data, message } = response.data;
      if (!success) {
        showToast({ type: 'error', message: message ?? 'Failed to create customer' });
        return;
      }
      setCustomers((prev) => (prev ? [...prev, data] : [data]));
      navigation.navigate('Congratulations')
      showToast({ type: 'success', message: 'Customer created successfully' });
    } catch (error) {
      handleError(error, 'Failed to create customer');
    } finally {
      setIsCustomerLoading(false);
    }
  };

  const updateCustomer = async (customerId: string, updates: Partial<ClientUpdateFormData>,files?:File[]|null): Promise<void> => {
    try {
      setIsCustomerLoading(true);
      const formData = new FormData();
      Object.entries(updates).forEach(([key, value]) => {
        if (key !== "images") {
          formData.append(key, value as string);
        }
      });

      if(files) files.forEach((file) => {formData.append("images", file)});
      const response = await api.patch<BaseResponse<CustomerDetails>>(`/customer/${customerId}`, formData);
      const { success, data, message } = response.data;
      if (!success) {
        showToast({ type: 'error', message: message ?? 'Failed to update customer' });
        return;
      }
      setCustomers((prev) =>
        prev ? prev.map((customer) => (customer._id === customerId ? data : customer)) : null
      );
      showToast({ type: 'success', message: 'Customer updated successfully' });
    } catch (error) {
      handleError(error, 'Failed to update customer');
    } finally {
      setIsCustomerLoading(false);
    }
  };

  const deleteCustomer = async (customerId: string): Promise<void> => {
    try {
      setIsCustomerLoading(true);
      const response = await api.delete<BaseResponse<null>>(`/customer/${customerId}`);
      const { success, message } = response.data;
      if (!success) {
        showToast({ type: 'error', message: message ?? 'Failed to delete customer' });
        return;
      }
      setCustomers((prev) => (prev ? prev.filter((customer) => customer._id !== customerId) : null));
      showToast({ type: 'success', message: 'Customer deleted successfully' });
      searchNavigation.navigate('SearchMain')
    } catch (error) {
      handleError(error, 'Failed to delete customer');
    } finally {
      setIsCustomerLoading(false);
    }
  };
  const deleteCustomerImage = async (customerId: string, imageUrl: string): Promise<void> => {
    try {
      setIsCustomerLoading(true);
      const response = await api.delete<BaseResponse<string[]>>(`/customer/${customerId}/images`, {
        data: { imageUrl },
      });
      const { success, data, message } = response.data;

      if (!success) {
        showToast({ type: 'error', message: message || 'Failed to delete image.' });
        return;
      }

      showToast({ type: 'success', message: 'Image deleted successfully.' });
    } catch (error) {
      console.log('Error deleting customer image:', error);
      handleError(error, 'Failed to delete image');
    } finally {
      setIsCustomerLoading(false);
    }
  };

  const searchCustomers = async (query: string): Promise<void> => {
    try {
      setIsCustomerLoading(true);
      const response = await api.get<BaseResponse<CustomerSummary[]>>(`/customer/customers/search`, {
        params: { query },
      });
      const { success, data } = response.data;
      if (!success) {
        // showToast({ type: 'error', message: message || 'No customers found.' });
        setFilteredCustomers([]);
        return;
      }

      setFilteredCustomers(data);
    } catch (error) {
        if(error instanceof AxiosError){
            if(error.status===404){
                setFilteredCustomers([])
            }
        }

    } finally {
      setIsCustomerLoading(false);
    }
  };

  const handleError = (error: any, defaultMessage: string) => {
    if (error instanceof AxiosError) {
      const { message } = error.response?.data;
      showToast({ type: 'error', message: message ?? defaultMessage });
    } else {
      showToast({ type: 'error', message: 'An unexpected error occurred' });
    }
  };
  useEffect(()=>{
    if(!customers) return
    setFilteredCustomers(customers)
  },[customers])
  return (
    <CustomerContext.Provider
      value={{
        getCustomers,
        getCustomerById,
        createCustomer,
        updateCustomer,
        deleteCustomer,
        customers,
        selectedCustomer,
        isCustomerLoading,
        searchCustomers,
        filteredCustomers,
        setFilteredCustomers,
        deleteCustomerImage,
        isCustomerDetailLoading
        
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
};
