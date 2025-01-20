import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Layout from '@/app/components/common/Layout'
import Header from '@/app/components/common/Header'
import { useAuth } from "@/app/context/AuthContext";
import Button from "@/app/components/common/Button";
import { useUser } from "@/app/context/UserContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileStackParamList } from "@/app/types/navigation";
import Heading from "@/app/components/common/Heading";
import { Formik } from "formik";
import * as Yup from 'yup';
import { Input, InputField } from '@/app/components/ui/input';
import { formatPhone } from "@/app/utils/format";
import { UserDetails } from "@/app/types/user";
import { rtlLanguages, useAppContext } from "@/app/context/AppProvider";

type ProfileScreenNavigationProp = StackNavigationProp<ProfileStackParamList>;

interface IProfileNavigationProps {
    navigation: ProfileScreenNavigationProp;
}

const EditProfileScreen = ({navigation}:IProfileNavigationProps) => {
  const {userDetails,updateProfile,isUserLoading} = useUser()
  const {i18n} = useAppContext()
  const schema = Yup.object({
    name: Yup.string().required(i18n.t('name_required')),
    email: Yup.string()
      .email(i18n.t('invalid_email_format')).required(i18n.t('email_required')),
    phoneNumber: Yup.string()
      .matches(/^((\+92)|(92)|0)?(3[0-9]{2})[0-9]{7}$/, i18n.t('phone_number_invalid')).required(i18n.t('phone_number_required'))
  });

  
  return (
    <Layout scrollable={false}>
      <View className='relative' style={styles.container}>
        <Header onBackPress={()=>{navigation.goBack()}} className="px-0 w-full"/>
        <Heading 
        titleTextStylesObject={{
        lineHeight: rtlLanguages.includes(i18n.locale) ? 50 : 25,
        writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr',
        }}
        title={i18n.t('edit_profile')} 
        className={`${rtlLanguages.includes(i18n.locale) ? 'ml-auto':'w-[160px]'}`}
        titleStyles='font-[InterBold] text-[21px] leading-[25px]' underlineStyles='mt-1'/>
        <View className='w-full mt-[0px]'>
            <Formik
                initialValues={{ email: userDetails?.email, phoneNumber:userDetails?.phoneNumber, name:userDetails?.name } as Partial<UserDetails>}
                validationSchema={schema}
                onSubmit={(values) => {
                    const updatedValues:  Partial<UserDetails> = {};
                    if(!userDetails) return
                    Object.entries(values).forEach(([key, value]) => {
                      if (value?.trim()!=userDetails[key as keyof UserDetails]) {
                        updatedValues[key as keyof UserDetails] = value.trim();
                      }
                    });
                    updateProfile(userDetails.userId,updatedValues)
                }}>
                {({ handleChange, handleBlur, handleSubmit ,values, errors, touched,dirty }) => {
                    return(
                        <View className="flex gap-y-[30px] justify-center w-full">
                            <View>
                                <Text style={{
                                    lineHeight: rtlLanguages.includes(i18n.locale) ? 52 : 24,
                                    textAlign: rtlLanguages.includes(i18n.locale) ? 'right' : 'left',
                                    writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
                                    }} 
                                className='text-[#000000] text-base font-medium font-[PoppinsRegular] ml-1 mb-1'>{i18n.t('full_name')}</Text>
                                <Input
                                    variant="outline"
                                    size="md"
                                    isInvalid={touched.name && Boolean(errors.name)}
                                    isRequired
                                    className="border-[#38D55B] border-[2px] rounded-[7px] w-full h-[56px] focus:border-[#38D55B] focus:ring-0"
                                >
                                    <InputField
                                    placeholder=""
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    className="text-base placeholder:text-[#818181] placeholder:text-[20px] placeholder:font-normal placeholder:font-[PoppinsRegular] placeholder:leading-[30px]"
                                    />
                                </Input>
                                {touched.name && errors.name && (
                                    <Text 
                                     style={{
                                        textAlign: rtlLanguages.includes(i18n.locale) ? 'right' : 'left',
                                        writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
                                        }}
                                    className="font-[PoppinsRegular] text-sm mt-1 ml-3 text-red-500">{errors.name}</Text>
                                )}
                            </View>
                            <View>
                                <Text 
                                    style={{
                                        lineHeight: rtlLanguages.includes(i18n.locale) ? 52 : 24,
                                        textAlign: rtlLanguages.includes(i18n.locale) ? 'right' : 'left',
                                        writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
                                    }} 
                                    className='text-[#000000] text-base font-medium font-[PoppinsRegular] ml-1 mb-1'>{i18n.t('email')}</Text>
                                <Input
                                    variant="outline"
                                    size="md"
                                    isInvalid={touched.email && Boolean(errors.email)}
                                    isRequired
                                    className="border-[#38D55B] border-[2px] rounded-[7px] w-full h-[56px] focus:border-[#38D55B] focus:ring-0"
                                >
                                    <InputField
                                    placeholder=""
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    className="text-base placeholder:text-[#818181] placeholder:text-[20px] placeholder:font-normal placeholder:font-[PoppinsRegular] placeholder:leading-[30px]"
                                    />
                                </Input>
                                {touched.email && errors.email && (
                                    <Text 
                                        style={{
                                            textAlign: rtlLanguages.includes(i18n.locale) ? 'right' : 'left',
                                            writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
                                        }}
                                        className="font-[PoppinsRegular] text-sm mt-1 ml-3 text-red-500">{errors.email}</Text>
                                )}
                            </View>
                            <View>
                                <Text 
                                 style={{
                                    lineHeight: rtlLanguages.includes(i18n.locale) ? 52 : 24,
                                    textAlign: rtlLanguages.includes(i18n.locale) ? 'right' : 'left',
                                    writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
                                }} 
                                className='text-[#000000] text-base font-medium font-[PoppinsRegular] ml-1 mb-1'>{i18n.t('phone_number')}</Text>
                                <Input
                                    variant="outline"
                                    size="md"
                                    isInvalid={touched.phoneNumber && Boolean(errors.phoneNumber)}
                                    isRequired
                                    className="border-[#38D55B] border-[2px] rounded-[7px] w-full h-[56px] focus:border-[#38D55B] focus:ring-0"
                                >
                                    <InputField
                                    placeholder=""
                                    value={values.phoneNumber}
                                    onChangeText={(number)=>{
                                        const formattedPhone = formatPhone(number);
                                        handleChange('phoneNumber')(formattedPhone)
                                    }}
                                    onBlur={handleBlur('phoneNumber')}
                                    className="text-base placeholder:text-[#818181] placeholder:text-[20px] placeholder:font-normal placeholder:font-[PoppinsRegular] placeholder:leading-[30px]"
                                    />
                                </Input>
                                {touched.phoneNumber && errors.phoneNumber && (
                                <Text 
                                    style={{
                                        textAlign: rtlLanguages.includes(i18n.locale) ? 'right' : 'left',
                                        writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
                                    }}
                                    className="font-[PoppinsRegular] text-sm mt-1 ml-3 text-red-500">{errors.phoneNumber}</Text>
                                )}
                            </View>
                        
                            <Button 
                                isDisabled={!dirty||isUserLoading} 
                                className="h-[66px] rounded-[7px]" 
                                buttonTextStyles="text-[22px] uppercase" 
                                buttonTextStylesObject={{
                                    lineHeight: rtlLanguages.includes(i18n.locale) ? 45 : 30,
                                    textAlign: rtlLanguages.includes(i18n.locale) ? 'right' : 'left',
                                    writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
                                }}
                                onPress={()=>handleSubmit()} 
                                title={i18n.t('submit')}
                            />
                        </View>
                    )}}
            </Formik>
        </View>
      </View>
    </Layout>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#fff",
    rowGap:34,
    paddingHorizontal:40,
    marginTop:20,
    overflow:'visible',
  },
});


export default EditProfileScreen;
