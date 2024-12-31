import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import LoginScreen from '@/app/screens/Auth/Login';
import SignupScreen from '@/app/screens/Auth/Signup';


const AuthStack = createStackNavigator();

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{
      headerShown:false
    }}>
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="Signup" component={SignupScreen} />
        {/* <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} /> */}
    </AuthStack.Navigator>
    );
}

export default AuthNavigator