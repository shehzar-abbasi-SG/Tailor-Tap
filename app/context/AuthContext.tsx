import React, { createContext, useState, useEffect, useContext } from 'react';
import { eventEmitter,api } from '@/app/config/api';
import { clearAuthData, saveAuthData } from '../utils/auth';
import { LoginCredentials, LoginResponse, SignupCredentials } from '../types/auth';
import { BaseResponse } from '../types';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigation } from '../types/navigation';
import { useAppContext } from './AppProvider';
import { useCustomToast } from '../components/common/Toast';
import { AxiosError } from 'axios';

interface AuthContextProps {
    logout: () => void;
    login:(_credentials:LoginCredentials) => Promise<void>;
    forgetPassword:(_email:string)=>Promise<void>
    verifyOtp:(otp:string)=>Promise<void>
    resetPassword:(newPassword:string)=>Promise<void>
    signup: (_credentials:SignupCredentials)=>Promise<void>
    isLoading:boolean

  }

const AuthContext = createContext<AuthContextProps | undefined>(undefined);



export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const {setIsAuthenticated} = useAppContext();
    const navigation = useNavigation<AuthNavigation>();
    const {showToast} = useCustomToast()
    const [isLoading,setisLoading] = useState(false) 
    const [resetPasswordFlow, setResetPasswordFlow] = useState<{
      email: string;
      otp: string;
    }>({
      email: '',
      otp: '',
    });

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      setisLoading(true)

      const response = await api.post<BaseResponse<LoginResponse>>('/auth/login', credentials);
      console.log('response :>> ',response);

      const { success, data,message,errors } = response.data;
      if(!success) {
        if(message) showToast({type:"error",message:message}) 
        else if(Array.isArray(errors)){
          showToast({type:"error",message:errors.map(err=>err.msg).join(' ')}) 
        }
        else showToast({type:"error",message:"Something went wrong"}) 
        return;
      }
      const {token,userId} = data
      await saveAuthData({ token, userId });
      setIsAuthenticated(true)
     showToast({type:"success", message: 'Login successful'});
    } catch (error) {
      console.log('error :>> ',error);

      if (error instanceof AxiosError) {
        const { message } = error.response?.data;
        showToast({ type: 'error', message: message ?? 'An error occurred' });
      }else {
        showToast({ type: 'error', message: 'Request setup failed' });
      }
    }finally{
      setisLoading(false)
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    clearAuthData();
  };

  const forgetPassword = async (email: string): Promise<void> => {
    try {
      setisLoading(true)
      const response = await api.post<BaseResponse<any>>('/auth/forget-password', { email });
      const { success, message ,errors} = response.data;
      if(!success) {
        if(message) showToast({type:"error",message:message}) 
        else if(Array.isArray(errors)){
          showToast({type:"error",message:errors.map(err=>err.msg).join(' ')}) 
        }
        else showToast({type:"error",message:"Something went wrong"}) 
        return;
      }
     showToast({type:"success", message: message??"OTP sent to your email."});
     setResetPasswordFlow((prev)=>({...prev,email}))
     navigation.navigate('VerifyOtp');
    } catch (error) {
      showToast({type:"error",message:'Something went wrong'});
    }finally{
      setisLoading(false)
    }
  };

  const verifyOtp = async (otp: string): Promise<void> => {
    try {
      setisLoading(true)
      const response = await api.post<BaseResponse<any>>('/auth/verify-otp', { otp,email:resetPasswordFlow.email });
      const { success, message,errors } = response.data;
      if(!success) {
        if(message) showToast({type:"error",message:message}) 
        else if(Array.isArray(errors)){
          showToast({type:"error",message:errors.map(err=>err.msg).join(' ')}) 
        }
        else showToast({type:"error",message:"Something went wrong"}) 
        return;
      }
     showToast({type:"success", message: 'OTP verified successfully'});
     setResetPasswordFlow((prev)=>({...prev,otp}))
     navigation.navigate('ResetPassword');
    } catch (error) {
      showToast({type:"error",message:'OTP verification failed'});
    }
    finally{
      setisLoading(false)
    }
  };

  const resetPassword = async (newPassword: string): Promise<void> => {
    try {
      setisLoading(true)
      const response = await api.post<BaseResponse<any>>('/auth/reset-password', { newPassword,...resetPasswordFlow });
      const { success, message,errors } = response.data;
      if(!success) {
        if(message) showToast({type:"error",message:message}) 
        else if(Array.isArray(errors)){
          showToast({type:"error",message:errors.map(err=>err.msg).join(' ')}) 
        }
        else showToast({type:"error",message:"Something went wrong"}) 
        return;
      }
     showToast({type:"success", message: 'Password reset successful!'});
     navigation.navigate('Login');
     setResetPasswordFlow({email:"",otp:""})
    } catch (error) {
      showToast({type:"error",message:'Password reset failed'});
    }
    finally{
      setisLoading(false)
    }
  };

  const signup = async (credentials: SignupCredentials): Promise<void> => {
    try {
      setisLoading(true)
      const {firstName,lastName,password,phoneNumber}= credentials;
      const newUser = {name:credentials.firstName.concat(' ').concat(credentials.lastName),phoneNumber,password,email:credentials.email}
      const response = await api.post<BaseResponse<LoginResponse>>('/auth/signup', newUser);
      const { success, data, message,errors } = response.data;
      if(!success) {
        if(message) showToast({type:"error",message:message}) 
        else if(Array.isArray(errors)){
          showToast({type:"error",message:errors.map(err=>err.msg).join(' ')}) 
        }
        else showToast({type:"error",message:"Something went wrong"}) 
        return;
      }
      const { token, userId, email } = data;
      await saveAuthData({ token, userId });
      setIsAuthenticated(true);
     showToast({type:"success", message: 'Signup successful!'});
    } catch (error) {
      showToast({type:"error",message:'Signup failed. Please try again.'});
    }
    finally{
      setisLoading(false)
    }
  };

  const handleTokenExpire = ()=>{
    showToast({type:"error",message:"Token expired! Logging out"})
    logout()
  }
  useEffect(() => {
    eventEmitter.on('tokenExpire', handleTokenExpire);

    return () => {
      eventEmitter.off('tokenExpire', handleTokenExpire); // Clean up on unmount
    };
  }, []);



  return (
    <AuthContext.Provider value={{ logout,login,forgetPassword,verifyOtp,resetPassword,signup,isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
