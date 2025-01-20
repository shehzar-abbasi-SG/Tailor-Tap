import React from 'react'
import Header from '@/app/components/common/Header';
import Heading from '@/app/components/common/Heading';
import { View, Text, StyleSheet } from "react-native";
import {MeasurementStackParamList } from "@/app/types/navigation";
import Button from "@/app/components/common/Button";
import { StackNavigationProp } from "@react-navigation/stack";
import { Formik } from "formik";
import * as Yup from 'yup';
import { Input, InputField } from '@/app/components/ui/input';
import Layout from "@/app/components/common/Layout";
import { Image } from "@/app/components/ui/image";
import { PartialClientDetailFormData, useClientDetailFormContext } from '@/app/context/FormContext';
import { rtlLanguages, useAppContext } from '@/app/context/AppProvider';



type MeasurementsScreenNavigationProp = StackNavigationProp<MeasurementStackParamList>;

interface IMeasurementNavigationProps {
    navigation: MeasurementsScreenNavigationProp;
  }

const MeasurementScreenPaincha =({navigation}:IMeasurementNavigationProps)=> {
    
    const {setFormData} = useClientDetailFormContext()
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
        className="self-center rounded-[3px] w-[140px] h-[34px]" buttonTextStyles="text-[13px] leading-[15px] font-bold font-[InterBold] uppercase p-0" onPress={()=>{}} title={i18n.t('paincha')}/>
       <Image
          source={require('@/assets/images/paincha_measurement.png')}
          alt="length measurement"
          className="w-full h-auto mt-5 "
          resizeMode="contain" 
        />
        <Formik
          initialValues={{ paincha: '' } as PartialClientDetailFormData}
          validationSchema={Yup.object({
                paincha: Yup.string().required(i18n.t('measurement_required'))
            })}
          onSubmit={(values) => {
            setFormData((prev)=>(
              {...prev,...values}
            ))
            navigation.navigate('AdditionalDetail')


          }}>
            {({ handleChange, handleBlur, handleSubmit,values, errors, touched }) => (
              <>
              <View className=''>
                <Input
                    variant="outline"
                    size="md"
                    isInvalid={touched.paincha && Boolean(errors.paincha)}
                    className="mt-[20px] border-[#38D55B] border-[2px] rounded-[7px] w-full h-[62px] focus:border-[#38D55B] focus:ring-0"
                  >
                    <InputField
                      placeholder={i18n.t('enter_paincha')}
                      value={values.paincha}
                      onChangeText={handleChange('paincha')}
                      onBlur={handleBlur('paincha')}
                      className={`pl-[30px] text-base placeholder:text-[#818181] placeholder:text-[20px] ${rtlLanguages.includes(i18n.locale)?"placeholder:text-right":"placeholder:text-left"}  placeholder:font-normal placeholder:font-[PoppinsRegular] placeholder:leading-[30px]`}
                     
                    />
                  </Input>
                  {touched.paincha && errors.paincha && (
                    <Text 
                      style={{
                            lineHeight: rtlLanguages.includes(i18n.locale) ? 25 : 25,
                            textAlign: rtlLanguages.includes(i18n.locale) ? 'right' : 'left',
                            writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
                        }}
                      className="font-[PoppinsRegular] text-sm mt-1 ml-1 text-red-500">{errors.paincha}</Text>
                  )}
              </View>
              <View className='flex gap-y-[16px]'>
                {/* <Button className="mt-0 h-[50px] rounded-[7px]" buttonTextStyles="text-[22px] leading-[33px] uppercase p-0" onPress={()=>handleSubmit()} title="Next"/> */}
                {/* <Button className="mt-0 bg-transparent h-[50px] rounded-[7px] border-[#38D55B] border-[2px]" buttonTextStyles="text-[22px] leading-[33px] uppercase text-[#38D55B] p-0" onPress={()=>navigation.navigate('AdditionalDetail')} title="Skip"/> */}
                <Button 
                  buttonTextStylesObject={{
                    lineHeight: rtlLanguages.includes(i18n.locale) ? 50 : 30,
                    writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
                  }}
                  className="mt-0 h-[52px] rounded-[7px]" buttonTextStyles="text-[22px] leading-[33px] uppercase p-0" onPress={()=>handleSubmit()} title={i18n.t('next')}/>
                  <Button 
                    buttonTextStylesObject={{
                      lineHeight: rtlLanguages.includes(i18n.locale) ? 50 : 30,
                      writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
                    }}
                    className="mt-0 bg-transparent h-[52px] rounded-[7px] border-[#38D55B] border-[2px]" buttonTextStyles="text-[22px] leading-[33px] uppercase text-[#38D55B] p-0" 
                    onPress={()=>navigation.navigate('AdditionalDetail')}
                    title={i18n.t('skip')}/>
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

export default MeasurementScreenPaincha