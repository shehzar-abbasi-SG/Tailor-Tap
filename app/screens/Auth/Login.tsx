
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AuthStackParamList } from "@/app/types/navigation";
import Button from "@/app/components/common/Button";
import {ButtonText, Button as LinkButton} from "@/app/components/ui/button"
import { StackNavigationProp } from "@react-navigation/stack";
import { Formik } from "formik";
import * as Yup from 'yup';
import { Input, InputField } from '@/app/components/ui/input';
import Layout from "@/app/components/common/Layout";
import { Image } from "@/app/components/ui/image";
import Heading from "@/app/components/common/Heading"

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

interface ILoginScreenProps {
  navigation: LoginScreenNavigationProp;
}
const LoginScreen = ({navigation}:ILoginScreenProps) => {

  return (
    <Layout>
      <View className="flex-1 items-center px-10 bg-white">
      <Image
          source={require('@/assets/logo-2.png')}
          alt="Logo"
          className="w-full h-auto mt-20"
          resizeMode="contain" 
        />
        <Heading title="Login" className="w-[111px] mt-[60px]" titleStyles="text-[36px] leading-[54px] font-bold font-[PoppinsBold]" underlineStyles="mt-[-5px]"/>
        <Formik
        initialValues={{ name: '', password: '' }}
        validationSchema={Yup.object({
          name: Yup.string().required('Name is required.'),
          password: Yup.string().required('Password is required.'),
        })}
        onSubmit={(values) => {
          console.log(values);
        }}>
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View className="flex justify-center gap-y-5 w-full mt-[60px]">
              <View>
                <Input
                  variant="rounded"
                  size="md"
                  isInvalid={touched.name && Boolean(errors.name)}
                  isRequired
                  className="border-[#38D55B] border-[2px] w-full h-[58px] focus:border-[#38D55B] focus:ring-0"
                >
                  <InputField
                    placeholder="Your Name"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    className="text-base placeholder:text-[#818181] placeholder:text-[20px] placeholder:font-normal placeholder:font-[PoppinsRegular] placeholder:leading-[30px]"
                  />
                </Input>
                {touched.name && errors.name && (
                  <Text className="font-[PoppinsRegular] text-sm mt-1 ml-3 text-red-500">{errors.name}</Text>
                )}
              </View>
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
              <Text className="font-[PoppinsRegular] font-normal text-base text-right text-[#F92424]">Forgot Password?</Text>
              <Button className="rounded-full h-[58px]" buttonTextStyles="normal-case text-[20px]" onPress={()=>handleSubmit()} title="Log in"/>
              <View className="flex flex-row items-center justify-between gap-x-[20px] px-3 mt-[13px]">
                <Text className="text-[18px] font-normal font-[PoppinsRegular] leading-[27px] text-[#818181]">Don't have an Account?</Text>
                <LinkButton variant="link" onPress={()=>navigation.navigate('Signup')}>
                  <ButtonText className="font-[PoppinsMedium] font-medium text-[19px] text-right text-[#F92424] underline">Sign up</ButtonText>
                </LinkButton>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default LoginScreen;