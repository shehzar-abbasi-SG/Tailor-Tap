import React, { createContext, useState, useEffect, useContext } from 'react';
import { api } from '@/app/config/api';
import { BaseResponse } from '../types';
import { AxiosError } from 'axios';
import { useCustomToast } from '../components/common/Toast';
import { UserDetails } from '../types/user';


interface UserContextProps {
  getUserDetails: (userId: string) => Promise<void>;
  updateProfile: (userId: string, updates: Partial<UserDetails>) => Promise<void>;
  userDetails: UserDetails | null;
  isUserLoading: boolean;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useCustomToast();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const getUserDetails = async (userId: string): Promise<void> => {
    try {
      setIsUserLoading(true);
      const response = await api.get<BaseResponse<UserDetails>>(`/user/${userId}`);
      const { success, data, message } = response.data;
      if (!success) {
        showToast({ type: 'error', message: message ?? 'Failed to fetch user details' });
        return;
      }
      setUserDetails(data);
    //   showToast({ type: 'success', message: 'User details fetched successfully' });
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data;
        showToast({ type: 'error', message: message ?? 'Failed to fetch user details' });
      } else {
        showToast({ type: 'error', message: 'An unexpected error occurred' });
      }
    } finally {
      setIsUserLoading(false);
    }
  };

  const updateProfile = async (userId: string, updates: Partial<UserDetails>): Promise<void> => {
    try {
      setIsUserLoading(true);
      const response = await api.patch<BaseResponse<UserDetails>>(`/user/${userId}`, updates);
      const { success, data, message, errors } = response.data;
      if (!success) {
        if (message) {
          showToast({ type: 'error', message });
        } else if (Array.isArray(errors)) {
          showToast({ type: 'error', message: errors.map((err) => err.msg).join(' ') });
        } else {
          showToast({ type: 'error', message: 'Failed to update profile' });
        }
        return;
      }
      setUserDetails(data);
      showToast({ type: 'success', message: 'Profile updated successfully' });
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data;
        showToast({ type: 'error', message: message ?? 'Failed to update profile' });
      } else {
        showToast({ type: 'error', message: 'An unexpected error occurred' });
      }
    } finally {
      setIsUserLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ getUserDetails, updateProfile, userDetails, isUserLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
