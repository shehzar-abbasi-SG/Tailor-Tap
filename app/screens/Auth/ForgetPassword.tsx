
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AuthNavigation } from "@/app/types/navigation";
import Button from "@/app/components/common/Button";
import { Formik } from "formik";
import * as Yup from 'yup';
import { Input, InputField } from '@/app/components/ui/input';
import Layout from "@/app/components/common/Layout";
import Heading from "@/app/components/common/Heading"
import { useAuth } from "@/app/context/AuthContext";
import FontAwesomeIcons from '@expo/vector-icons/FontAwesome';

interface IForgetPasswordScreenProps {
  navigation: AuthNavigation;
}
const ForgetPasswordScreen = ({navigation}:IForgetPasswordScreenProps) => {
  const {forgetPassword,isLoading} = useAuth()
  return (
    <Layout>
        <View className="flex-1 px-10 bg-white w-full">
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <FontAwesomeIcons name="chevron-left" size={22} color="#000" />
            </TouchableOpacity>
            <Heading title="Forget Password" className="mt-[60px] w-[260px]" titleStyles="text-[26px] leading-[34px] font-bold font-[PoppinsBold]" underlineStyles="mt-[0px]"/>
            <Formik
            initialValues={{ email: ''}}
            validationSchema={Yup.object({
                email: Yup.string().email('Invalid email').required('Email is required.'),
            })}
            onSubmit={(values) => {
                forgetPassword(values.email)
            }}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched,isValid }) => (
                <View className="flex justify-center gap-y-5 w-full mt-[60px]">
                    <View>
                        <Input
                            variant="rounded"
                            size="md"
                            isInvalid={touched.email && Boolean(errors.email)}
                            isRequired
                            className="border-[#38D55B] border-[2px] w-full h-[58px] focus:border-[#38D55B] focus:ring-0"
                        >
                            <InputField
                            placeholder="Email"
                            value={values.email}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            className="text-base placeholder:text-[#818181] placeholder:text-[20px] placeholder:font-normal placeholder:font-[PoppinsRegular] placeholder:leading-[30px]"
                            />
                        </Input>
                        {touched.email && errors.email && (
                            <Text className="font-[PoppinsRegular] text-sm mt-1 ml-3 text-red-500">{errors.email}</Text>
                        )}
                    </View>
                    <Button isLoading={isLoading} className="rounded-full h-[58px]" buttonTextStyles="normal-case text-[20px]" onPress={()=>handleSubmit()} title="Submit"/>
                </View>
                )}
            </Formik>
        </View>
    </Layout>
  );
};


export default ForgetPasswordScreen;
