import React from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import Layout from '@/app/components/common/Layout'
import Header from '@/app/components/common/Header'
import { useAppContext } from '@/app/context/AppProvider'
import ListItem, { ListContainer } from '@/app/components/common/List'
import Heading from '@/app/components/common/Heading'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { PartialUpgradeFormData, useUpgradePlanFormContext } from '@/app/context/UpgradePlanFormContext'
import AntDesignIcon from "@expo/vector-icons/AntDesign"
import { ScrollView } from 'react-native-gesture-handler'
import Button from '@/app/components/common/Button'
import { StackNavigationProp } from '@react-navigation/stack'
import { UpgradeStackParamList } from '@/app/types/navigation'

const choosePlans = [
  { id: '1', period: 'Yearly', title:"1 YEAR / 12 MONTHS",price:"8000" },
  { id: '2', period: 'Quaterly', title:"3 MONTHS",price:"2000" },
  { id: '3', period: 'Monthly', title:"1 MONTH",price:"1000" },
];
type UpgradeStackNavigationProp = StackNavigationProp<UpgradeStackParamList>;


interface IUpgradeNavigationProps {
  navigation:UpgradeStackNavigationProp
  }


function ChoosePlan({navigation}:IUpgradeNavigationProps) {
  const {setShowUpgradeStack} = useAppContext()
  const {setFormData} = useUpgradePlanFormContext()
    const {setFieldValue,errors,values,handleSubmit} = useFormik({
      initialValues: {
        selectedPlan: '',
      } as PartialUpgradeFormData,
      validationSchema: Yup.object({
        selectedPlan: Yup.string().required('Plan selection is required'),
      }),
      onSubmit: (values) => {
        setFormData((prev)=>({...prev,...values}))
        navigation.navigate("Account")
      },
    });
  return (
    <Layout scrollable={false}>
      <View className='relative' style={styles.container}>
        <View className='w-full flex items-end z-10 absolute right-0 top-5'>
          <Header displayMode='Upgrade' onBackPress={()=>{setShowUpgradeStack(false)}}/>
        </View>
        <View className='flex items-center justify-center gap-y-4 absolute inset-0 bg-[#38D55B] rounded-b-[82px] h-[260px]'>
          <Text className='font-[PoppinsMedium] font-medium text-[26px] leading-[39px]'>Lorem ipsum dolar</Text>
          <ListContainer>
            <ListItem>
              <Text className='text-[18px] font-normal leading-[27px] font-[PoppinsRegular]'>Lorem ipsum dolar sit</Text>
            </ListItem>
            <ListItem>
              <Text className='text-[18px] font-normal leading-[27px] font-[PoppinsRegular]'>Lorem ipsum dolar sit</Text>
            </ListItem>
            <ListItem>
              <Text className='text-[18px] font-normal leading-[27px] font-[PoppinsRegular]'>Lorem ipsum dolar sit</Text>
            </ListItem>
          </ListContainer>
        </View>
        <View className='w-full flex items-center justify-center pt-[280px]'>
          <Heading title='Choose Your Plan:' className='w-[300px]' 
          titleStyles='font-[PoppinsBold] font-bold text-[29px] leading-[43px] uppercase' underlineStyles='mt-1'/>
         <ScrollView
            horizontal={false} 
            showsHorizontalScrollIndicator={false} 
            showsVerticalScrollIndicator={false} 
            scrollEnabled={true} 
            overScrollMode="never"
            contentContainerStyle={{
              flexGrow: 1,
              paddingTop: 60,
              paddingBottom: 20,
            }}
            style={{
              overflow: 'hidden',
              paddingHorizontal:20 // Ensure content stays inside bounds
            }}>
            <View className='flex items-center w-full gap-y-[20px]'>
              {choosePlans.map((plan)=>(
                <TouchableHighlight underlayColor="#D5E8D6" 
                  onPress={()=>setFieldValue("selectedPlan",plan.id)} key={plan.id} 
                  className={`flex flex-row items-center justify-between border-[3px] gap-x-[37px] relative
                    ${plan.id===values.selectedPlan?"bg-[#D5E8D6] border-[#38D55B]":"bg-white border-transparent"} 
                    px-[27px] py-[21px] w-full rounded-[4px] h-[87px]`} 
                  style={{boxShadow:"0px 0px 16.6px 0px #00000040"}}>
                    <>
                      <Text className="font-[PoppinsBold] font-bold text-[17px] leading-[25.5px] ">{plan.title}</Text>
                      <View className='flex flex-row gap-x-[33px] h-full items-center'>
                        <View className="w-[3px] h-full bg-[#D1D1D1]"/>
                        <Heading title={`${plan.price}/-`} className="w-[70px]" titleStyles="font-[PoppinsBold] font-bold text-[19px] leading-[28.5px]" underlineStyles='mt-[-3px]'/>
                      </View>
                      <View className={`absolute right-[-12px] top-[-12px] bg-[#38D55B] rounded-full flex items-center justify-center flex-shrink-0 w-[30px] h-[30px] ${plan.id===values.selectedPlan?"opacity-[1]":"opacity-[0]"} transition-opacity duration-200`}>
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
            <View className='w-full pt-[50px]'>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding:40,
    overflow:'visible',
  },
 
});

export default ChoosePlan