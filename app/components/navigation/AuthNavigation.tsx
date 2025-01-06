import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import LoginScreen from '@/app/screens/Auth/Login';
import SignupScreen from '@/app/screens/Auth/Signup';
import ForgetPasswordScreen from '@/app/screens/Auth/ForgetPassword';
import VerifyOtpScreen from '@/app/screens/Auth/VerifyOtp';
import ResetPasswordScreen from '@/app/screens/Auth/ResetPassword';


const AuthStack = createStackNavigator();

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{
      headerShown:false
    }}>
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="Signup" component={SignupScreen} />
        <AuthStack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
        <AuthStack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
        <AuthStack.Screen name="ResetPassword" component={ResetPasswordScreen} />


    </AuthStack.Navigator>
    );
}

export default AuthNavigator