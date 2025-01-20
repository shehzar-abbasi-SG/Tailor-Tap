import React from 'react'
import Header from '@/app/components/common/Header';
import Heading from '@/app/components/common/Heading';
import { View, Text, StyleSheet } from "react-native";
import {MeasurementStackParamList } from "@/app/types/navigation";
import Button from "@/app/components/common/Button";
import { StackNavigationProp } from "@react-navigation/stack";
import { Formik } from "formik";
import * as Yup from 'yup';
import Layout from "@/app/components/common/Layout";
import { PartialClientDetailFormData, useClientDetailFormContext } from '@/app/context/FormContext';
import { Textarea, TextareaInput } from '@/app/components/ui/textarea';
import { useCustomer } from '@/app/context/CustomerContext';
import { rtlLanguages, useAppContext } from '@/app/context/AppProvider';



type MeasurementsScreenNavigationProp = StackNavigationProp<MeasurementStackParamList>;

interface IMeasurementNavigationProps {
    navigation: any;
  }

const MeasurementScreenAdditionalInfo =({navigation}:IMeasurementNavigationProps)=> {
    
    const {setFormData,formData} = useClientDetailFormContext()
    const {createCustomer,isCustomerLoading} = useCustomer()
    const {i18n} = useAppContext()
    
  return (
    <Layout>
      <Header displayMode="Measurements" onBackPress={()=>navigation.goBack()} onVideoPress={()=>{}}/>
      <View style={styles.container}>
      <Heading 
        titleTextStylesObject={{
          lineHeight: rtlLanguages.includes(i18n.locale) ? 40 : 25,
          writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
        }}
        title={i18n.t('measurements')} 
        className={`${rtlLanguages.includes(i18n.locale) ? 'ml-auto w-[50px]':'w-[180px]'}`} 
        titleStyles='font-[InterBold] text-[21px] leading-[25px]' 
        underlineStyles='mt-1'/>
       <Button 
        buttonTextStylesObject={{
          lineHeight: rtlLanguages.includes(i18n.locale) ? 35 : 30,
          writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
        }}
        className="self-center rounded-[3px] w-[140px] h-[34px]" buttonTextStyles="text-[13px] leading-[15px] font-bold font-[InterBold] uppercase p-0" onPress={()=>{}} title={i18n.t('additional_detail')}/>
        <Formik
          initialValues={{ additionalInformation: '' } as PartialClientDetailFormData}
          validationSchema={Yup.object({
            additionalInformation: Yup.string()
            })}
          onSubmit={(values) => {
            setFormData((prev)=>(
              {...prev,...values}
            ))
            createCustomer({...formData,...values})
          }}>
            {({ handleChange, handleBlur, handleSubmit,values, errors, touched }) => (
              <>
              <View className=''>
                <Textarea
                    size="md"
                    isInvalid={touched.additionalInformation && Boolean(errors.additionalInformation)}
                    className="mt-[20px] border-[#38D55B] border-[2px] rounded-[7px] w-full h-[178px] focus:border-[#38D55B] focus:ring-0"

                    >
                    <TextareaInput 
                      value={values.additionalInformation}
                      onChangeText={handleChange('additionalInformation')}
                      onBlur={handleBlur('additionalInformation')}
                      placeholder={i18n.t('enter_additional_detail')}
                      className={`pl-[30px] pt-[30px] text-base placeholder:text-[#818181] placeholder:text-[20px] placeholder:font-normal placeholder:font-[PoppinsRegular] placeholder:leading-[30px] ${rtlLanguages.includes(i18n.locale)?"placeholder:text-right":"placeholder:text-left"}`}

                    />
                </Textarea>
                  {touched.additionalInformation && errors.additionalInformation && (
                    <Text className="font-[PoppinsRegular] text-sm mt-1 ml-1 text-red-500">{errors.additionalInformation}</Text>
                  )}
              </View>
              <View className='flex gap-y-[16px]'>
                <Button 
                buttonTextStylesObject={{
                  lineHeight: rtlLanguages.includes(i18n.locale) ? 57 : 30,
                  writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
                }}
                isLoading={isCustomerLoading} 
                isDisabled={isCustomerLoading} 
                className="mt-0 h-[57px] rounded-[7px]" 
                buttonTextStyles="text-[22px] leading-[33px] uppercase p-0" 
                onPress={()=>handleSubmit()} title={i18n.t('done')}/>
                <Button 
                 buttonTextStylesObject={{
                  lineHeight: rtlLanguages.includes(i18n.locale) ? 57 : 30,
                  writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
                }}
                isLoading={isCustomerLoading} 
                isDisabled={isCustomerLoading} 
                className="mt-0 bg-transparent h-[57px] rounded-[7px] border-[#38D55B] border-[2px] disabled:bg-transparent " buttonTextStyles="text-[22px] leading-[33px] uppercase text-[#38D55B] p-0" 
                onPress={()=>{createCustomer({...formData})}} title={i18n.t('skip')}/>
              
              </View>
            </>
          )}
        </Formik>
      </View>
    </Layout>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    rowGap:34,
    padding:40,
    marginTop:20

  }
});

export default MeasurementScreenAdditionalInfo