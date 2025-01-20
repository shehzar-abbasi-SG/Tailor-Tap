import React from 'react'
import Header from '@/app/components/common/Header';
import Heading from '@/app/components/common/Heading';
import { View, Text, StyleSheet } from "react-native";
import {HomeStackParamList } from "@/app/types/navigation";
import Button from "@/app/components/common/Button";
import { StackNavigationProp } from "@react-navigation/stack";
import { Formik } from "formik";
import * as Yup from 'yup';
import { Input, InputField } from '@/app/components/ui/input';
import Layout from "@/app/components/common/Layout";
import { PartialClientDetailFormData, useClientDetailFormContext } from '@/app/context/FormContext';
import { rtlLanguages, useAppContext } from '@/app/context/AppProvider';


type ClientFormScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'ClientForm'>;

interface IClientFormNavigationProps {
    navigation: ClientFormScreenNavigationProp;
  }
const ClientFormScreen = ({navigation}:IClientFormNavigationProps) => {
  const {setFormData} = useClientDetailFormContext()
  const {setShowUpgradeModal,i18n} = useAppContext()
  
  const schema = Yup.object({
    fullName: Yup.string().required(i18n.t('name_required')),
    cast: Yup.string().required(i18n.t('cast_required')),
    phoneNumber: Yup.string().required(i18n.t('phone_number_required')).matches( /^((\+92)|(92)|0)?(3[0-9]{2})[0-9]{7}$/,i18n.t('phone_number_invalid')),
    address:Yup.string()
  })
  return (
    <Layout scrollable={false}>
      <Header onBackPress={()=>navigation.goBack()} onVideoPress={()=>setShowUpgradeModal(true)}/>
        <Layout isKeyboardAvoidingView>
          <View style={styles.container}>
            <Heading 
              title={i18n.t('client_detail')}
              className={`w-[160px] ${rtlLanguages.includes(i18n.locale) && 'ml-auto'}`}
              titleStyles='font-[InterBold] text-[21px] leading-[25px]'  
              underlineStyles='mt-1'
              titleTextStylesObject={{
                lineHeight: rtlLanguages.includes(i18n.locale) ? 50 : 25,
                writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
              }}
              />
            <View className='w-full mt-[30px]'>
              <Formik
                initialValues={{ fullName: '', cast: '',phoneNumber:"",address:"" } as PartialClientDetailFormData}
                validationSchema={schema}
                onSubmit={(values) => {
                  setFormData((prev)=>(
                    {...prev,...values}
                  ))
                  navigation.navigate('Measurements')
                }}>
                  {({ handleChange, handleBlur, handleSubmit, setFieldValue,values, errors, touched }) => (
                    <View className="flex gap-y-[30px] justify-center w-full">
                        <View>
                        <Text style={{
                          lineHeight: rtlLanguages.includes(i18n.locale) ? 52 : 24,
                           textAlign: rtlLanguages.includes(i18n.locale) ? 'right' : 'left',
                           writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
                        }} className='text-[#000000] text-base font-medium font-[PoppinsRegular] ml-1 mb-1'>{i18n.t('full_name')}</Text>
                        <Input
                          variant="outline"
                          size="md"
                          isInvalid={touched.fullName && Boolean(errors.fullName)}
                          isRequired
                          className="border-[#38D55B] border-[2px] rounded-[7px] w-full h-[56px] focus:border-[#38D55B] focus:ring-0"
                        >
                          <InputField
                            placeholder=""
                            value={values.fullName}
                            onChangeText={handleChange('fullName')}
                            onBlur={handleBlur('fullName')}
                            className="text-base placeholder:text-[#818181] placeholder:text-[20px] placeholder:font-normal placeholder:font-[PoppinsRegular] placeholder:leading-[30px]"
                          />
                        </Input>
                        {touched.fullName && errors.fullName && (
                          <Text 
                          style={{
                            textAlign: rtlLanguages.includes(i18n.locale) ? 'right' : 'left',
                            writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
                         }}
                          className="font-[PoppinsRegular] text-sm mt-1 ml-3 text-red-500">{errors.fullName}</Text>
                        )}
                      </View>
                      <View>
                        <Text 
                        style={{
                          lineHeight: rtlLanguages.includes(i18n.locale) ? 25 : 25,
                          textAlign: rtlLanguages.includes(i18n.locale) ? 'right' : 'left',
                          writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
                        }}
                        className='text-[#000000] text-base font-medium font-[PoppinsRegular] ml-1 mb-1'>{i18n.t('cast')}</Text>
                        <Input
                          variant="outline"
                          size="md"
                          isInvalid={touched.cast && Boolean(errors.cast)}
                          isRequired
                          className="border-[#38D55B] border-[2px] rounded-[7px] w-full h-[56px] focus:border-[#38D55B] focus:ring-0"
                        >
                          <InputField
                            placeholder=""
                            value={values.cast}
                            onChangeText={handleChange('cast')}
                            onBlur={handleBlur('cast')}
                            className="text-base placeholder:text-[#818181] placeholder:text-[20px] placeholder:font-normal placeholder:font-[PoppinsRegular] placeholder:leading-[30px]"
                          />
                        </Input>
                        {touched.cast && errors.cast && (
                          <Text 
                          style={{
                            textAlign: rtlLanguages.includes(i18n.locale) ? 'right' : 'left',
                            writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
                         }}
                          className="font-[PoppinsRegular] text-sm mt-1 ml-3 text-red-500">{errors.cast}</Text>
                        )}
                      </View>
                      <View>
                        <Text 
                        style={{
                          lineHeight: rtlLanguages.includes(i18n.locale) ? 25 : 25,
                          textAlign: rtlLanguages.includes(i18n.locale) ? 'right' : 'left',
                          writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
                        }}
                        className='text-[#000000] text-base font-medium font-[PoppinsRegular] ml-1 mb-1'>{i18n.t('phone_number')}*</Text>
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
                              // const formattedPhone = formatPhone(number);
                              handleChange('phoneNumber')(number)
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
                      <View>
                        <Text 
                          style={{
                            lineHeight: rtlLanguages.includes(i18n.locale) ? 25 : 25,
                            textAlign: rtlLanguages.includes(i18n.locale) ? 'right' : 'left',
                            writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
                          }}
                        className='text-[#000000] text-base font-medium font-[PoppinsRegular] ml-1 mb-1'>{i18n.t('address')} ({i18n.t('optional')})</Text>
                        <Input
                          variant="outline"
                          size="md"
                          isInvalid={touched.address && Boolean(errors.address)}
                          isRequired
                          className="border-[#38D55B] border-[2px] rounded-[7px] w-full h-[56px] focus:border-[#38D55B] focus:ring-0"
                        >
                          <InputField
                            placeholder=""
                            value={values.address}
                            onChangeText={handleChange('address')}
                            onBlur={handleBlur('address')}
                            className="text-base placeholder:text-[#818181] placeholder:text-[20px] placeholder:font-normal placeholder:font-[PoppinsRegular] placeholder:leading-[30px]"
                          />
                        </Input>
                        
                      </View>
                      <Button 
                       buttonTextStylesObject={{
                            lineHeight: rtlLanguages.includes(i18n.locale) ? 40 : 30,
                            writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
                          }}
                      className="h-[66px] rounded-[7px]" buttonTextStyles="text-[22px] uppercase" onPress={()=>handleSubmit()} title={i18n.t('next')}/>
                    </View>
                  )}
              </Formik>
            </View>
          </View>
        </Layout>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    rowGap:34,
    padding:40,
    paddingTop:20,
    marginTop:20
  }
});
export default ClientFormScreen