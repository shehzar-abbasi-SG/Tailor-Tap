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
import { Grid, GridItem } from '@/app/components/ui/grid';
import { Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from "@/app/components/ui/checkbox";
import { CheckIcon } from "@/app/components/ui/icon";
import { SignupCredentials } from "@/app/types/auth";
import { useAuth } from "@/app/context/AuthContext";


type SignupScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Signup'>;

interface ISignupProps {
  navigation: SignupScreenNavigationProp;
}

const SignupScreen = ({navigation}:ISignupProps) => {
  const {signup,isLoading} = useAuth()

  return (
    <Layout isKeyboardAvoidingView>
      <View className="flex-1 items-center px-10 bg-white">
        <Image
            source={require('@/assets/images/logo-2.png')}
            alt="Logo"
            className="w-full h-auto mt-20"
            resizeMode="contain" 
          />
          <Heading title="Sign up" className="w-[144px] mt-[60px]" titleStyles="text-[36px] leading-[54px] font-bold font-[PoppinsBold]" underlineStyles="mt-[-5px]"/>
          <Formik
            initialValues={{ firstName: '', lastName: '',email:"",phoneNumber:"",password:"" ,agreeToPrivacyPolicy:false} as SignupCredentials}
            validationSchema={Yup.object({
              firstName: Yup.string().required('First Name is required.'),
              lastName: Yup.string().required('Last Name is required.'),
              email: Yup.string().email('Invalid email').required('Email is required.'),
              phoneNumber: Yup.string()
              .required('Phone number is required')
              .matches(
                /^((\+92)|(92)|0)?(3[0-9]{2})[0-9]{7}$/,
                'Phone number is not valid'
              ),
              password: Yup.string().min(6,'Password too short').required('Password is required.'),
              agreeToPrivacyPolicy: Yup
                .bool()
                .oneOf([true], 'You must agree to the privacy policy')
                .required('You must agree to the privacy policy'),
            })}
            onSubmit={(values) => {
              signup(values)
            }}>
            {({ handleChange, handleBlur, handleSubmit, setFieldValue,values, errors, touched }) => (
              <View className="flex justify-center w-full mt-[60px]">
                  <Grid
                    className="gap-[22px]"
                    _extra={{
                      className: "grid-cols-8",
                    }}
                  >
                    <GridItem
                      _extra={{
                        className: "col-span-4",
                      }}
                    >
                      <View>
                        <Input
                          variant="rounded"
                          size="md"
                          isInvalid={touched.firstName && Boolean(errors.firstName)}
                          isRequired
                          className="border-[#38D55B] border-[2px] w-full h-[58px] focus:border-[#38D55B] focus:ring-0"
                        >
                          <InputField
                            placeholder="First Name"
                            value={values.firstName}
                            onChangeText={handleChange('firstName')}
                            onBlur={handleBlur('firstName')}
                            className="text-base placeholder:text-[#818181] placeholder:text-[20px] placeholder:font-normal placeholder:font-[PoppinsRegular] placeholder:leading-[30px]"
                          />
                        </Input>
                        {touched.firstName && errors.firstName && (
                          <Text className="font-[PoppinsRegular] text-sm mt-1 ml-3 text-red-500">{errors.firstName}</Text>
                        )}
                      </View>

                    </GridItem>
                    <GridItem
                      _extra={{
                        className: "col-span-4",
                      }}
                    >
                        <View>
                        <Input
                          variant="rounded"
                          size="md"
                          isInvalid={touched.lastName && Boolean(errors.lastName)}
                          isRequired
                          className="border-[#38D55B] border-[2px] w-full h-[58px] focus:border-[#38D55B] focus:ring-0"
                        >
                          <InputField
                            placeholder="Last Name"
                            value={values.lastName}
                            onChangeText={handleChange('lastName')}
                            onBlur={handleBlur('lastName')}
                            className="text-base placeholder:text-[#818181] placeholder:text-[20px] placeholder:font-normal placeholder:font-[PoppinsRegular] placeholder:leading-[30px]"
                          />
                        </Input>
                        {touched.lastName && errors.lastName && (
                          <Text className="font-[PoppinsRegular] text-sm mt-1 ml-3 text-red-500">{errors.lastName}</Text>
                        )}
                      </View>

                    </GridItem>
                    <GridItem
                      _extra={{
                        className: "col-span-8",
                      }}
                    >
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

                    </GridItem>
                    <GridItem
                      _extra={{
                        className: "col-span-8",
                      }}
                    >
                      <View>
                        <Input
                          variant="rounded"
                          size="md"
                          isInvalid={touched.phoneNumber && Boolean(errors.phoneNumber)}
                          isRequired
                          className="border-[#38D55B] border-[2px] w-full h-[58px] focus:border-[#38D55B] focus:ring-0"
                        >
                          <InputField
                            placeholder="Phone Number"
                            value={values.phoneNumber}
                            onChangeText={(number)=>{
                              // const formattedPhone = formatPhoneNumber(number);
                              handleChange('phoneNumber')(number)
                            }}
                            onBlur={handleBlur('phoneNumber')}
                            className="text-base placeholder:text-[#818181] placeholder:text-[20px] placeholder:font-normal placeholder:font-[PoppinsRegular] placeholder:leading-[30px]"
                          />
                        </Input>
                        {touched.phoneNumber && errors.phoneNumber && (
                          <Text className="font-[PoppinsRegular] text-sm mt-1 ml-3 text-red-500">{errors.phoneNumber}</Text>
                        )}
                      </View>

                    </GridItem>
                    <GridItem
                      _extra={{
                        className: "col-span-8",
                      }}
                    >
                      <View>
                        <Input
                          variant="rounded"
                          size="md"
                          isInvalid={touched.password && Boolean(errors.password)}
                          isRequired
                          className="border-[#38D55B] border-[2px] w-full h-[58px] focus:border-[#38D55B] focus:ring-0"
                        >
                          <InputField
                            placeholder="Password"
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
                    </GridItem>
                    <GridItem   
                    _extra={{
                        className: "col-span-8",
                      }}>
                        <View className="px-3">
                          <Checkbox
                            size="md"
                            value={""}
                            isInvalid={!!errors.agreeToPrivacyPolicy && touched.agreeToPrivacyPolicy}
                            isChecked={values.agreeToPrivacyPolicy}
                            onChange={(isChecked) => setFieldValue('agreeToPrivacyPolicy', isChecked)}
                          >
                            <CheckboxIndicator>
                              <CheckboxIcon as={CheckIcon} />
                            </CheckboxIndicator>
                            <CheckboxLabel>
                              <View className="flex flex-row items-center">
                                  <Text className="font-[PoppinsRegular] font-normal text-base text-[#818181]">I Agree with</Text>
                                  <LinkButton variant="link" className="mx-1 h-fit" onPress={()=>{
                                    }}>
                                  <ButtonText className="text-[#F92424] font-[PoppinsRegular] font-normal text-base">
                                      privacy
                                  </ButtonText>
                                  </LinkButton> 
                                  <Text className="font-[PoppinsRegular] font-normal text-base text-[#818181]">and</Text> 
                                  <LinkButton variant="link" className="mx-1 h-fit" onPress={()=>{}}>
                                  <ButtonText className="text-[#F92424] font-[PoppinsRegular] font-normal text-base">
                                    policy
                                  </ButtonText>
                                  </LinkButton>
                                </View>
                            </CheckboxLabel>
                          </Checkbox>

                          {touched.agreeToPrivacyPolicy && errors.agreeToPrivacyPolicy && (
                            <Text className="font-[PoppinsRegular] text-sm mt-1 ml-3 text-red-500">{errors.agreeToPrivacyPolicy}</Text>
                          )}
                        </View>
                    </GridItem>
                    <GridItem _extra={{
                      className:"col-span-8"
                    }}>
                      <Button isLoading={isLoading} className="rounded-full h-[58px]" buttonTextStyles="normal-case text-[20px]" onPress={()=>handleSubmit()} title="Sign up"/>
                    </GridItem>
                    <GridItem _extra={{className:"col-span-8"}}>
                     
                    </GridItem>
                  </Grid>
                  <View className="flex flex-row items-center justify-between gap-x-[20px] px-3">
                    <Text className="text-[18px] font-normal font-[PoppinsRegular] leading-[27px] text-[#818181]">Already have an account?</Text>
                    <LinkButton variant="link" onPress={()=>navigation.goBack()}>
                      <ButtonText className="font-[PoppinsMedium] font-medium text-[19px] text-right text-[#F92424] underline">Log in</ButtonText>
                    </LinkButton>
                  </View>
              </View>
              )}
          </Formik>
      </View>
    </Layout>
  );
};



export default SignupScreen;
