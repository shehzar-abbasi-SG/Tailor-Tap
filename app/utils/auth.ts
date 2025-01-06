import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthData {
  token: string;
  userId: string;
}

const AUTH_STORAGE_KEY = 'authData';

export const saveAuthData = async (data: AuthData): Promise<void> => {
  try {
    const jsonData = JSON.stringify(data);
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, jsonData);
  } catch (error) {
    throw new Error('Unable to save authentication data');
  }
};
export const getAuthData = async (): Promise<AuthData | null> => {
  try {
    const authInfo = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
    return authInfo ? JSON.parse(authInfo) as AuthData : null;
  } catch (error) {
    throw new Error('Unable to retrieve authentication data');
  }
};

export const clearAuthData = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (error) {
    throw new Error('Unable to clear authentication data');
  }
};
