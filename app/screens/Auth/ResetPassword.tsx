
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AuthNavigation, AuthStackParamList } from "@/app/types/navigation";
import Button from "@/app/components/common/Button";
import { Formik } from "formik";
import * as Yup from 'yup';
import { Input, InputField } from '@/app/components/ui/input';
import Layout from "@/app/components/common/Layout";
import Heading from "@/app/components/common/Heading"
import { useAuth } from "@/app/context/AuthContext";
import FontAwesomeIcons from '@expo/vector-icons/FontAwesome';


interface IResetPasswordScreenProps {
  navigation: AuthNavigation;
}
const ResetPasswordScreen = ({navigation}:IResetPasswordScreenProps) => {
  const {resetPassword,isLoading} = useAuth()
  return (
    <Layout>
      <View className="flex-1 px-10 bg-white w-full">
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <FontAwesomeIcons name="chevron-left" size={22} color="#000" />
        </TouchableOpacity>
        <Heading title="Reset Password" className="mt-[60px] w-[235px]" titleStyles="text-[26px] leading-[34px] font-bold font-[PoppinsBold]" underlineStyles="mt-[0px]"/>
        <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        validationSchema={Yup.object({
          password: Yup.string().required('Password is required.'),
          confirmPassword: Yup.string()
            .required('Confirm Password is required.')
            .oneOf([Yup.ref('password')], 'Passwords must match'),
        })}
        onSubmit={(values) => {
          resetPassword(values.password)
        }}>
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View className="flex justify-center gap-y-5 w-full mt-[60px]">
                <View>
                    <Input
                        variant="rounded"
                        size="md"
                        isRequired
                        isInvalid={touched.password && Boolean(errors.password)}
                        className="border-[#38D55B] border-[2px] w-full h-[58px] focus:border-[#38D55B] focus:ring-0"
                        >
                    <InputField
                        placeholder="Password"
                        type="password"
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        className="text-base placeholder:text-[#818181] placeholder:text-[20px] placeholder:font-normal placeholder:font-[PoppinsRegular] placeholder:leading-[30px]"
                    />
                    </Input>
                    {touched.password && errors.password && (
                    <Text className="font-[PoppinsRegular] text-sm mt-1 ml-3 text-red-500">{errors.password}</Text>
                    )}
                </View>
                <View>
                    <Input
                    variant="rounded"
                    size="md"
                    isRequired
                    isInvalid={touched.confirmPassword && Boolean(errors.confirmPassword)}
                    className="border-[#38D55B] border-[2px] w-full h-[58px] focus:border-[#38D55B] focus:ring-0"
                    >
                    <InputField
                        placeholder="Confirm Password"
                        type="password"
                        value={values.confirmPassword}
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        className="text-base placeholder:text-[#818181] placeholder:text-[20px] placeholder:font-normal placeholder:font-[PoppinsRegular] placeholder:leading-[30px]"
                    />
                    </Input>
                    {touched.confirmPassword && errors.confirmPassword && (
                        <Text className="font-[PoppinsRegular] text-sm mt-1 ml-3 text-red-500">{errors.confirmPassword}</Text>
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



export default ResetPasswordScreen;
