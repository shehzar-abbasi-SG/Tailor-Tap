import React from 'react'
import { Pressable, Text, TouchableHighlight, View } from 'react-native'
import Layout from '@/app/components/common/Layout'
import Header from '@/app/components/common/Header'
import { rtlLanguages, useAppContext } from '@/app/context/AppProvider'
import Heading from '@/app/components/common/Heading'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { PartialUpgradeFormData, useUpgradePlanFormContext } from '@/app/context/UpgradePlanFormContext'
import { ScrollView } from 'react-native-gesture-handler'
import Button from '@/app/components/common/Button'
import { StackNavigationProp } from '@react-navigation/stack'
import { UpgradeStackParamList } from '@/app/types/navigation'
import { Image } from '@/app/components/ui/image'
import { Input, InputField } from '@/app/components/ui/input';
import * as ImagePicker from 'expo-image-picker';


type UpgradeStackNavigationProp = StackNavigationProp<UpgradeStackParamList>;
  
interface IUpgradeNavigationProps {
  navigation:UpgradeStackNavigationProp
  }

function AccountInformation({navigation}:IUpgradeNavigationProps) {
    const {setShowUpgradeStack,i18n} = useAppContext()
    const {setFormData} = useUpgradePlanFormContext() 
        
    const {setFieldValue,errors,values,handleSubmit,touched,handleBlur,handleChange} = useFormik({
        initialValues: {
            transactionId: '',
            image: null
        } as PartialUpgradeFormData,
        validationSchema: Yup.object({
        transactionId: Yup.string().matches(/^\d+$/, i18n.t('transaction_id_format')).required(i18n.t('transaction_id_required')),
        image: Yup.mixed<string>()
        .required(i18n.t('screenshot_required'))
        }),
        onSubmit: (values) => {
        setFormData((prev)=>({...prev,...values}))
        navigation.navigate("Congratulations")
        },
    });
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        });
    
        if (!result.canceled) {
            setFieldValue("image",result.assets[0].uri);
        }
    };
    return (
        <Layout scrollable={false}>
            <View className='relative'>
                <View className='w-full flex items-end z-10 pt-4'>
                <Header displayMode='Upgrade' onBackPress={()=>{setShowUpgradeStack(false)}}/>
                </View>
                <View className='w-full flex items-center justify-center pt-[50px]'>
                <Heading 
                titleTextStylesObject={{
                    lineHeight: rtlLanguages.includes(i18n.locale) ? 80 : 33,
                    writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
                }}
                title={i18n.t('bank_account_information')} className='w-[260px]' 
                titleStyles='text-center font-[PoppinsBold] font-bold text-[22px] leading-[33px] uppercase' underlineStyles='mt-[-2px]'/>
                <ScrollView 
                    contentContainerStyle={{ flexGrow: 1,paddingTop:48 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View className='flex items-center w-full gap-y-[30px] px-10'>
                        <View>
                            <Text 
                            style={{
                                lineHeight: rtlLanguages.includes(i18n.locale) ? 35 : 24,
                                writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr',
                                textAlign: rtlLanguages.includes(i18n.locale) ? 'right' : 'left'
                                }} 
                            className='text-[#000000] text-base font-normal font-[PoppinsRegular] ml-1 mb-1'>{i18n.t('transaction_id')}</Text>
                            <Input
                                variant="outline"
                                size="md"
                                isInvalid={touched.transactionId && Boolean(errors.transactionId)}
                                isRequired
                                className="border-[#38D55B] border-[2px] rounded-[7px] w-full h-[56px] focus:border-[#38D55B] focus:ring-0"
                            >
                            <InputField
                                placeholder=""
                                value={`${values.transactionId}`}
                                onChangeText={(value)=>{
                                    if (/^\d*$/.test(value)) {
                                        handleChange('transactionId')(value)
                                      }
                                }}
                                onBlur={handleBlur('transactionId')}
                                className="text-base placeholder:text-[#818181] placeholder:text-[20px] placeholder:font-normal placeholder:font-[PoppinsRegular] placeholder:leading-[30px]"
                            />
                            </Input>
                            {touched.transactionId && errors.transactionId && (
                                <Text 
                                style={{
                                    lineHeight: rtlLanguages.includes(i18n.locale) ? 30 : 20,
                                    writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
                                    marginLeft:rtlLanguages.includes(i18n.locale) ? 'auto' : 0, 
            
                                }}
                                className="font-[PoppinsRegular] text-sm mt-1 ml-3 text-red-500">{errors.transactionId}</Text>
                            )}
                        </View>
                        <Pressable onPress={pickImage} className='w-full flex gap-y-[17px]'>
                            <Text 
                              style={{
                                lineHeight: rtlLanguages.includes(i18n.locale) ? 35 : 24,
                                writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr',
                                textAlign: rtlLanguages.includes(i18n.locale) ? 'right' : 'left'
                                }} 
                            className='text-[#000000] text-base font-normal font-[PoppinsRegular] ml-1 mb-1'>{i18n.t('upload_screenshot')}</Text>
                            <View className='bg-white w-full h-[202px] rounded-[4px] items-center justify-center flex gap-y-[17px] px-[60px]' style={{
                                boxShadow:"0px 4px 8.2px 0px #00000066"

                            }}>
                                {values.image?
                                  <Image
                                    source={{uri:values.image}}
                                    alt="File Upload"
                                    // className="w-full h-auto"
                                    resizeMode="contain" 
                                    size='xl'
                                    width={200}
                                    height={200}
                                    />
                                :
                                  <Image
                                    source={require("@/assets/images/placeholder_image.png")}
                                    alt="File Upload"
                                    className="w-full h-auto"
                                    resizeMode="contain" 
                                    />
                                }
                              
                                <Text 
                                   style={{
                                    lineHeight: rtlLanguages.includes(i18n.locale) ? 35 : 24,
                                    writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr',
                                    textAlign: rtlLanguages.includes(i18n.locale) ? 'right' : 'left'
                                    }} 
                                className='text-center text-black leading-[21px] font-normal text-[14px] font-[PoppinsRegular]'>
                                    {i18n.locale==='en'?`Upload your ${<Text className='font-bold font-[PoppinsBold] text-[#38D55B]'>Screenshot</Text>} here to confirm purchase`:
                                    i18n.t('upload_screenshot_here')}
                                </Text>
                            </View>
                            {touched.image && errors.image && (
                            <Text 
                            style={{
                                lineHeight: rtlLanguages.includes(i18n.locale) ? 30 : 20,
                                writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
                                marginLeft:rtlLanguages.includes(i18n.locale) ? 'auto' : 0, 
        
                            }}
                            className="font-[PoppinsRegular] text-sm mt-1 text-red-500">{errors.image}</Text>
                        )}
                        </Pressable>
                       
                    </View>
                    <View className='px-10 w-full pt-[50px]'>
                        <Button 
                            buttonTextStylesObject={{
                                lineHeight: rtlLanguages.includes(i18n.locale) ? 50 : 33,
                                writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
                            }}
                            className="mt-0 h-[65px] rounded-[4px] w-full" 
                            buttonTextStyles="text-[22px] leading-[33px] uppercase p-0" 
                            onPress={()=>handleSubmit()} title={i18n.t('confirm_purchase')}/>
                    </View>
                </ScrollView>
                </View>
            </View>
        </Layout>
    )
}

export default AccountInformation