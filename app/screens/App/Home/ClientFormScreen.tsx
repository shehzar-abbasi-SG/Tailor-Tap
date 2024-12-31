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
import { formatPhone } from "@/app/utils/format";
import { PartialClientDetailFormData, useClientDetailFormContext } from '@/app/context/FormContext';


type ClientFormScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'ClientForm'>;

interface IClientFormNavigationProps {
    navigation: ClientFormScreenNavigationProp;
  }
const ClientFormScreen = ({navigation}:IClientFormNavigationProps) => {
  const {setFormData} = useClientDetailFormContext()
  const schema = Yup.object({
    fullName: Yup.string().required('Name is required.'),
    cast: Yup.string().required("Cast is required"),
    phoneNumber: Yup.string()
                  .required('Phone number is required')
                  .matches(
                    /^\(\d{3}\) \d{3}-\d{4}$/,
                    'Phone number is not valid'
                  ),
    address:Yup.string()
  })
  return (
    <Layout>
      <Header onBackPress={()=>navigation.goBack()} onVideoPress={()=>{}}/>
      <View style={styles.container}>
        <Heading title='Client Detail' className='w-[160px]' titleStyles='font-[InterBold] text-[21px] leading-[25px]' underlineStyles='mt-1'/>
        <View className='w-full mt-[30px]'>
           <Formik
              initialValues={{ fullName: '', cast: '',phoneNumber:"",address:"" } as PartialClientDetailFormData}
              validationSchema={schema}
              onSubmit={(values) => {
                console.log(values);
                setFormData((prev)=>(
                  {...prev,...values}
                ))
                navigation.navigate('Measurements')

              }}>
                {({ handleChange, handleBlur, handleSubmit, setFieldValue,values, errors, touched }) => (
                    <View className="flex gap-y-[30px] justify-center w-full">
                       <View>
                        <Text className='text-[#000000] text-base font-medium font-[PoppinsRegular] ml-1 mb-1'>Full Name</Text>
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
                          <Text className="font-[PoppinsRegular] text-sm mt-1 ml-3 text-red-500">{errors.fullName}</Text>
                        )}
                      </View>
                      <View>
                        <Text className='text-[#000000] text-base font-medium font-[PoppinsRegular] ml-1 mb-1'>Cast</Text>
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
                          <Text className="font-[PoppinsRegular] text-sm mt-1 ml-3 text-red-500">{errors.cast}</Text>
                        )}
                      </View>
                      <View>
                        <Text className='text-[#000000] text-base font-medium font-[PoppinsRegular] ml-1 mb-1'>Phone Number*</Text>
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
                          <Text className="font-[PoppinsRegular] text-sm mt-1 ml-3 text-red-500">{errors.phoneNumber}</Text>
                        )}
                      </View>
                      <View>
                        <Text className='text-[#000000] text-base font-medium font-[PoppinsRegular] ml-1 mb-1'>Address (optional)</Text>
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
                      <Button className="h-[66px] rounded-[7px]" buttonTextStyles="text-[22px] uppercase" onPress={()=>handleSubmit()} title="Next"/>
                    </View>
            )}
            </Formik>
        </View>
     </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#fff",
    rowGap:34,
    padding:40,
    marginTop:20

  }
});
export default ClientFormScreen