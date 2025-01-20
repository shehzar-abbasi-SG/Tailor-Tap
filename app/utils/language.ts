import AsyncStorage from '@react-native-async-storage/async-storage';

const LANGUAGE_STORAGE_KEY = 'language_preference';

export const saveLanguagePreference = async (language: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    throw new Error('Unable to save language preference');
  }
};

export const getLanguagePreference = async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    } catch (error) {
      throw new Error('Unable to retrieve language preference');
    }
  };
  