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



type MeasurementsScreenNavigationProp = StackNavigationProp<MeasurementStackParamList>;

interface IMeasurementNavigationProps {
    navigation: any;
  }

const MeasurementScreenAdditionalInfo =({navigation}:IMeasurementNavigationProps)=> {
    
    const {setFormData,formData} = useClientDetailFormContext()
    const {createCustomer,isCustomerLoading} = useCustomer()
    
  return (
    <Layout>
      <Header displayMode="Measurements" onBackPress={()=>navigation.goBack()} onVideoPress={()=>{}}/>
      <View style={styles.container}>
      <Heading title='Measurements' className='w-[180px]' titleStyles='font-[InterBold] text-[21px] leading-[25px]' underlineStyles='mt-1'/>
      <Button className="self-center rounded-[3px] w-[230px] h-[55px]" buttonTextStyles="text-[21px] leading-[25px] font-bold font-[InterBold] normal-case p-0" onPress={()=>{}} title="Additional Detail"/>
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
                      placeholder="Enter Additional Detail"
                      className="pl-[30px] pt-[30px] text-base placeholder:text-[#818181] placeholder:text-[20px] placeholder:font-normal placeholder:font-[PoppinsRegular] placeholder:leading-[30px]"

                    />
                </Textarea>
                  {touched.additionalInformation && errors.additionalInformation && (
                    <Text className="font-[PoppinsRegular] text-sm mt-1 ml-1 text-red-500">{errors.additionalInformation}</Text>
                  )}
              </View>
              <View className='flex gap-y-[16px]'>
                <Button isLoading={isCustomerLoading} isDisabled={isCustomerLoading} className="mt-0 h-[50px] rounded-[7px]" buttonTextStyles="text-[22px] leading-[33px] uppercase p-0" onPress={()=>handleSubmit()} title="Done"/>
                <Button isLoading={isCustomerLoading} isDisabled={isCustomerLoading} className="mt-0 bg-transparent h-[50px] rounded-[7px] border-[#38D55B] border-[2px] disabled:bg-transparent " buttonTextStyles="text-[22px] leading-[33px] uppercase text-[#38D55B] p-0" onPress={()=>{createCustomer({...formData})}} title="Skip"/>
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