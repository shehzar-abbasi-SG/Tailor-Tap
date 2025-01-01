import React from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import Layout from '@/app/components/common/Layout'
import Header from '@/app/components/common/Header'
import { useAppContext } from '@/app/context/AppProvider'
import Heading from '@/app/components/common/Heading'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { PartialUpgradeFormData, useUpgradePlanFormContext } from '@/app/context/UpgradePlanFormContext'
import { ScrollView } from 'react-native-gesture-handler'
import Button from '@/app/components/common/Button'
import { StackNavigationProp } from '@react-navigation/stack'
import { UpgradeStackParamList } from '@/app/types/navigation'
import { Image } from '@/app/components/ui/image'
import AntDesignIcon from "react-native-vector-icons/AntDesign"

const chooseAccount = [
    { id: '1', name: 'JazzCash',image:require("@/assets/jazzcash_logo.png")},
    { id: '2', name: 'EasyPaisa',image:require("@/assets/easypaisa_logo.png")},
    { id: '3', name: 'Placeholder',image:""},
  ];
  type UpgradeStackNavigationProp = StackNavigationProp<UpgradeStackParamList>;
  
  
  interface IUpgradeNavigationProps {
    navigation:UpgradeStackNavigationProp
    }
  
function ChooseAccount({navigation}:IUpgradeNavigationProps) {
    const {setShowUpgradeStack} = useAppContext()
    const {setFormData} = useUpgradePlanFormContext()
    
    const {setFieldValue,errors,values,handleSubmit} = useFormik({
      initialValues: {
        selectedBankAccount: '',
      } as PartialUpgradeFormData,
      validationSchema: Yup.object({
        selectedBankAccount: Yup.string().required('Bank account selection is required'),
      }),
      onSubmit: (values) => {
        console.log('Form Submitted:', values);
        setFormData((prev)=>({...prev,...values}))
        navigation.navigate("AccountInfo")
      },
    });
  return (
    <Layout scrollable={false}>
      <View className='relative'>
        <View className='w-full flex items-end z-10 pt-4'>
          <Header displayMode='Upgrade' onBackPress={()=>{setShowUpgradeStack(false)}}/>
        </View>
        <View className='w-full flex items-center justify-center pt-[150px]'>
          <Heading title='CHOOSE YOUR BANK ACCOUNT' className='w-[260px]' 
          titleStyles='text-center font-[PoppinsBold] font-bold text-[22px] leading-[33px] uppercase' underlineStyles='mt-1'/>
          <ScrollView 
           contentContainerStyle={{ flexGrow: 1,paddingTop:60 }}
           showsVerticalScrollIndicator={false}
          >
            <View className='flex items-center w-full gap-y-[30px] px-10'>
              {chooseAccount.map((account)=>(
                <TouchableHighlight underlayColor="#D5E8D6" 
                  onPress={()=> {
                    if(account.name==="Placeholder"){
                        console.log("another option")
                    }else setFieldValue("selectedBankAccount",account.id)
                  }} key={account.id} 
                  className={`flex flex-row items-center justify-between gap-x-[37px] relative
                    ${account.id===values.selectedBankAccount?"bg-[#D5E8D6]":"bg-white border-transparent"} 
                        px-[27px] w-full rounded-[4px] h-[72px]`} 
                        style={{boxShadow:"0px 4px 8.2px 0px #00000066"}}>
                    <>
                        {account.name==="Placeholder"?
                        <View className='flex flex-row items-center justify-center w-full'>
                          <Text className="text-[22px] font-medium font-[PoppinsMedium] leading-[33px] text-[#555555]">+Add another option</Text>
                        </View>
                        :
                        <Image
                            source={account.image}
                            alt="File Upload"
                            className="w-full h-auto"
                            resizeMode="contain" 
                        />
                        }
                        <View className={`absolute right-[-12px] top-[-12px] bg-[#38D55B] rounded-full flex items-center justify-center flex-shrink-0 w-[30px] h-[30px] 
                            ${account.id===values.selectedBankAccount?"opacity-[1]":"opacity-[0]"} transition-opacity duration-200`}>
                          <AntDesignIcon  name="check" size={25}/>
                      </View> 
                    </>
                </TouchableHighlight>
              ))}
              {errors.selectedPlan && 
                <View className='mt-[-10px] w-full'>
                    <Text className='text-left self-start font-[PoppinsRegular] text-sm text-red-500'>{errors.selectedPlan}</Text>
                </View>
              }
            </View>
            <View className='px-10 w-full pt-[50px]'>
              <Button 
                  className="mt-0 h-[72px] rounded-[4px] w-full" 
                  buttonTextStyles="text-[22px] leading-[33px] uppercase p-0" 
                  onPress={()=>handleSubmit()} title="Next"/>
            </View>
          </ScrollView>
        </View>
      </View>
    </Layout>
  )
}

export default ChooseAccount