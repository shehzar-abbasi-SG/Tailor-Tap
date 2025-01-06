import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "./navigation";

export interface LoginResponse{
    userId: string;
    email: string;
    token: string;
}

export type LoginCredentials = {
    email: string;
    password: string;
}
  
export interface ForgetPasswordResponse{
    message: string
}


export type SignupCredentials = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    agreeToPrivacyPolicy: boolean;
  };