
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AuthNavigation, AuthStackParamList } from "@/app/types/navigation";
import Button from "@/app/components/common/Button";
import Layout from "@/app/components/common/Layout";
import Heading from "@/app/components/common/Heading"
import { useAuth } from "@/app/context/AuthContext";
import FontAwesomeIcons from '@expo/vector-icons/FontAwesome';
import { OtpInput } from "react-native-otp-entry";

interface IVerifyOtpScreenProps {
  navigation: AuthNavigation;
}
const VerifyOtpScreen = ({navigation}:IVerifyOtpScreenProps) => {
  const {verifyOtp,isLoading} = useAuth()
  const [isOtpEntered,setIsOtpEntered] = useState(false)
  const [isError,setIsError] = useState(false)
  const [enteredOtp,setEnteredOtp] = useState('')

  const handleSubmit =()=>{
    if(isError) return
    if(!isOtpEntered) setIsError(true)
    verifyOtp(enteredOtp)
  } 
  return (
    <Layout>
        <View className="flex-1 px-10 bg-white w-full">
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <FontAwesomeIcons name="chevron-left" size={22} color="#000" />
            </TouchableOpacity>
            <View className="my-[60px] w-[263px] flex gap-y-4">
              <Heading title="Verification Code" className="w-full" titleStyles="text-[26px] leading-[34px] font-bold font-[PoppinsBold]" underlineStyles="mt-[0px]"/>
              <Text className="text-gray-400 font-normal font-[PoppinsRegular] text-base">We have sent the verification code to your email address</Text>
            </View>
            <OtpInput 
                numberOfDigits={6} 
                focusColor={'#38D55B'} 
                type="numeric"
                secureTextEntry={false}
                focusStickBlinkingDuration={500}
           
                onTextChange={(text) => setIsOtpEntered(text.trim().length===6)}
                onFilled={(otp)=>{
                    setEnteredOtp(otp)
                }}
                textInputProps={{
                    accessibilityLabel: "One-Time Password",
                }}
            />
            {isError && (
                <Text className="font-[PoppinsRegular] text-sm mt-1 ml-3 text-red-500">Please enter otp</Text>
            )}
            <Button isDisabled={!isOtpEntered || isError} isLoading={isLoading} className="rounded-full h-[58px] mt-[40px]" buttonTextStyles="normal-case text-[20px]" onPress={handleSubmit} title="Continue"/>

        </View>
    </Layout>
  );
};



export default VerifyOtpScreen;
