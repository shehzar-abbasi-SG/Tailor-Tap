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



type MeasurementsScreenNavigationProp = StackNavigationProp<MeasurementStackParamList>;

interface IMeasurementNavigationProps {
    navigation: MeasurementsScreenNavigationProp;
  }

const MeasurementScreenCollar =({navigation}:IMeasurementNavigationProps)=> {
    
    const {setFormData} = useClientDetailFormContext()
    
  return (
    <Layout>
      <Header displayMode="Measurements" onBackPress={()=>navigation.goBack()} onVideoPress={()=>{}}/>
      <View style={styles.container}>
      <Heading title='Measurements' className='w-[180px]' titleStyles='font-[InterBold] text-[21px] leading-[25px]' underlineStyles='mt-1'/>
      <Button className="self-center rounded-[3px] w-[90px] h-[34px]" buttonTextStyles="text-[13px] leading-[15px] font-bold font-[InterBold] uppercase p-0" onPress={()=>{}} title="Collar"/>
       <Image
          source={require('@/assets/images/collar_measurement.png')}
          alt="length measurement"
          className="w-full h-auto mt-5 "
          resizeMode="contain" 
        />
        <Formik
          initialValues={{ collar: '' } as PartialClientDetailFormData}
          validationSchema={Yup.object({
                collar: Yup.string().required('Invalid measurement')
            })}
          onSubmit={(values) => {
            setFormData((prev)=>(
              {...prev,...values}
            ))
            navigation.navigate('Chest')


          }}>
            {({ handleChange, handleBlur, handleSubmit,values, errors, touched }) => (
              <>
              <View className=''>
                <Input
                    variant="outline"
                    size="md"
                    isInvalid={touched.collar && Boolean(errors.collar)}
                    className="mt-[20px] border-[#38D55B] border-[2px] rounded-[7px] w-full h-[62px] focus:border-[#38D55B] focus:ring-0"
                  >
                    <InputField
                      placeholder="Enter Colllar"
                      value={values.collar}
                      onChangeText={handleChange('collar')}
                      onBlur={handleBlur('collar')}
                      className="pl-[30px] text-base placeholder:text-[#818181] placeholder:text-[20px] placeholder:font-normal placeholder:font-[PoppinsRegular] placeholder:leading-[30px]"
                    />
                  </Input>
                  {touched.collar && errors.collar && (
                    <Text className="font-[PoppinsRegular] text-sm mt-1 ml-1 text-red-500">{errors.collar}</Text>
                  )}
              </View>
              <View className='flex gap-y-[16px]'>
                <Button className="mt-0 h-[50px] rounded-[7px]" buttonTextStyles="text-[22px] leading-[33px] uppercase p-0" onPress={()=>handleSubmit()} title="Next"/>
                <Button className="mt-0 bg-transparent h-[50px] rounded-[7px] border-[#38D55B] border-[2px]" buttonTextStyles="text-[22px] leading-[33px] uppercase text-[#38D55B] p-0" onPress={()=>navigation.navigate('Chest')} title="Skip"/>
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

export default MeasurementScreenCollar