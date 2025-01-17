import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Layout from "@/app/components/common/Layout";
import Header from "@/app/components/common/Header";
import Button from "@/app/components/common/Button";
import { ScrollView } from 'react-native';
import { Input, InputField } from "@/app/components/ui/input";
import { StackNavigationProp } from "@react-navigation/stack";
import {SearchStackParamList } from "@/app/types/navigation";
import * as Yup from "yup"
import { useFormik } from "formik";
import { useCustomer } from "@/app/context/CustomerContext";
import { Spinner } from "@/app/components/ui/spinner";
import { ClientDetailFormData, ClientUpdateFormData, useClientDetailFormContext } from "@/app/context/FormContext";
import { useRoute } from '@react-navigation/native';


type SearchScreenNavigationProp = StackNavigationProp<SearchStackParamList>;

interface ISearchNavigationProps {
    navigation: any;

  }
const EditDetail = ({navigation}:ISearchNavigationProps) => {
    const route = useRoute();
    const params:any = route.params

    console.log('params.isEditMode ===> ', params.isEditMode);

    const validationSchema = Yup.object({
        shoulder: Yup.number(),
        arms: Yup.number(),
        cuffs: Yup.number(),
        collar: Yup.number(),
        chest: Yup.number(),
        fitting: Yup.number(),
        lap: Yup.number(),
        pant: Yup.number(),
        paincha: Yup.number(),
    });
    const {selectedCustomer,isCustomerLoading} = useCustomer()
    const {setUpdateClientFormData} = useClientDetailFormContext()

    const {handleChange,errors,handleSubmit,touched,values} = useFormik({
        initialValues: {
        length: selectedCustomer?.length,
        shoulder: selectedCustomer?.shoulder,
        arms: selectedCustomer?.arms,
        cuffs: selectedCustomer?.cuffs,
        collar: selectedCustomer?.collar,
        chest: selectedCustomer?.chest,
        fitting: selectedCustomer?.fitting,
        lap: selectedCustomer?.lap,
        pant: selectedCustomer?.pant,
        paincha: selectedCustomer?.paincha,
        } as Partial<ClientUpdateFormData>,
        validationSchema,
        onSubmit: (values) => {
        const updatedValues:  Partial<ClientDetailFormData> = {};
        if(!selectedCustomer) return
        Object.entries(values).forEach(([key, value]) => {
            if (
              typeof value === "string" &&
              value.trim() !== (selectedCustomer[key as keyof ClientDetailFormData] as string | undefined)?.trim()
            ) {
              updatedValues[key as keyof ClientDetailFormData] = value.trim();
            }
          }); 
        setUpdateClientFormData({...updatedValues})
        navigation.navigate("EditPhotos", {
            isEditMode: params?.isEditMode
          })
        },
    });
  return (
    <Layout scrollable={false}>
        <Header onBackPress={()=>navigation.goBack()}/>
        <View style={styles.container} className="px-10 pt-[30px]">
            <View className="w-full border-[1px] border-[#DCDCDC]" />
                <View className="flex flex-row justify-between items-center w-full py-[24px]">
                    <View className="flex flex-col gap-y-1">
                    <Text>{selectedCustomer?.fullName}</Text>
                    <Text>{selectedCustomer?.phoneNumber}</Text>
                    </View>
                    {params?.isEditMode && 
                        <Button title="Edit" className="mt-0 h-[39px] rounded-[6px]" 
                        buttonTextStyles="text-[17px] leading-[25.5px] normal-case p-0 font-bold font-[PoppinsBold]"  />
                    }
                </View>
                <Text className="text-[#36BC54] text-left self-start font-[PoppinsRegular] font-normal text-[17px] leading-[25.5px] mb-3 mt-[20px]">Detail</Text>
                <View className="w-full border-[1px] border-[#DCDCDC]" />
                {isCustomerLoading?
                    <View className="mt-[100px]">
                        <Spinner />
                    </View>
                :
                <ScrollView 
                contentContainerStyle={{ flexGrow: 1,paddingTop:28,paddingBottom:100 }}
                showsVerticalScrollIndicator={false}
                >
                    <View className="flex flex-row justify-between items-center w-full">
                        <Text className="text-[23px] font-normal font-[PoppinsRegular] leading-[34.5px] text-[#585858]">Length</Text>
                        <Input
                            variant="outline"
                            size="md"
                            isReadOnly={!params?.isEditMode}
                            className="bg-[#E7E7E7] w-[114px] rounded-[5px] h-[43px] focus:outline-none focus-within:ring-0 focus:border-transparent focus:ring-0"
                            >
                            <InputField
                                placeholder=""
                                value={values.length}
                                onChangeText={handleChange('length')}
                                className="text-base text-center placeholder:text-[#585858] placeholder:text-[16px] placeholder:font-normal placeholder:font-[PoppinsRegular] placeholder:leading-[24px]"
                            />
                        </Input>
                    </View>
                    <View className="flex flex-row justify-between items-center w-full mt-7">
                        <Text className="text-[23px] font-normal font-[PoppinsRegular] leading-[34.5px] text-[#585858]">Shoulder</Text>
                        <Input
                            variant="outline"
                            size="md"
                            isReadOnly={!params?.isEditMode}
                            className="bg-[#E7E7E7] w-[114px] rounded-[5px] h-[43px] focus:outline-none focus-within:ring-0 focus:border-transparent focus:ring-0"
                            >
                            <InputField
                                placeholder=""
                                value={values.shoulder}
                                onChangeText={handleChange('shoulder')}
                                className="text-base text-center placeholder:text-[#585858] placeholder:text-[16px] placeholder:font-normal placeholder:font-[PoppinsRegular] placeholder:leading-[24px]"
                            />
                        </Input>
                    </View>
                    <View className="flex flex-row justify-between items-center w-full mt-7">
                        <Text className="text-[23px] font-normal font-[PoppinsRegular] leading-[34.5px] text-[#585858]">Arms</Text>
                        <Input
                            variant="outline"
                            size="md"
                            isReadOnly={!params?.isEditMode}
                            className="bg-[#E7E7E7] w-[114px] rounded-[5px] h-[43px] focus:outline-none focus-within:ring-0 focus:border-transparent focus:ring-0"
                            >
                            <InputField
                                placeholder=""
                                value={values.arms}
                                onChangeText={handleChange('arms')}
                                className="text-base text-center placeholder:text-[#585858] placeholder:text-[16px] placeholder:font-normal placeholder:font-[PoppinsRegular] placeholder:leading-[24px]"
                            />
                        </Input>
                    </View>
                    <View className="flex flex-row justify-between items-center w-full mt-7">
                        <Text className="text-[23px] font-normal font-[PoppinsRegular] leading-[34.5px] text-[#585858]">Cuffs</Text>
                        <Input
                            variant="outline"
                            size="md"
                            isReadOnly={!params?.isEditMode}
                            className="bg-[#E7E7E7] w-[114px] rounded-[5px] h-[43px] focus:outline-none focus-within:ring-0 focus:border-transparent focus:ring-0"
                            >
                            <InputField
                                placeholder=""
                                value={values.cuffs}
                                onChangeText={handleChange('cuffs')}
                                className="text-base text-center placeholder:text-[#585858] placeholder:text-[16px] placeholder:font-normal placeholder:font-[PoppinsRegular] placeholder:leading-[24px]"
                            />
                        </Input>
                    </View>
                    <View className="flex flex-row justify-between items-center w-full mt-7">
                        <Text className="text-[23px] font-normal font-[PoppinsRegular] leading-[34.5px] text-[#585858]">Collar</Text>
                        <Input
                            variant="outline"
                            size="md"
                            isReadOnly={!params?.isEditMode}
                            className="bg-[#E7E7E7] w-[114px] rounded-[5px] h-[43px] focus:outline-none focus-within:ring-0 focus:border-transparent focus:ring-0"
                            >
                            <InputField
                                placeholder=""
                                value={values.collar}
                                onChangeText={handleChange('collar')}
                                className="text-base text-center placeholder:text-[#585858] placeholder:text-[16px] placeholder:font-normal placeholder:font-[PoppinsRegular] placeholder:leading-[24px]"
                            />
                        </Input>
                    </View>
                    <View className="flex flex-row justify-between items-center w-full mt-7">
                        <Text className="text-[23px] font-normal font-[PoppinsRegular] leading-[34.5px] text-[#585858]">Chest</Text>
                        <Input
                            variant="outline"
                            size="md"
                            isReadOnly={!params?.isEditMode}
                            className="bg-[#E7E7E7] w-[114px] rounded-[5px] h-[43px] focus:outline-none focus-within:ring-0 focus:border-transparent focus:ring-0"
                            >
                            <InputField
                                placeholder=""
                                value={values.chest}
                                onChangeText={handleChange('chest')}
                                className="text-base text-center placeholder:text-[#585858] placeholder:text-[16px] placeholder:font-normal placeholder:font-[PoppinsRegular] placeholder:leading-[24px]"
                            />
                        </Input>
                    </View>
                    <View className="flex flex-row justify-between items-center w-full mt-7">
                        <Text className="text-[23px] font-normal font-[PoppinsRegular] leading-[34.5px] text-[#585858]">Fitting</Text>
                        <Input
                            variant="outline"
                            size="md"
                            isReadOnly={!params?.isEditMode}
                            className="bg-[#E7E7E7] w-[114px] rounded-[5px] h-[43px] focus:outline-none focus-within:ring-0 focus:border-transparent focus:ring-0"
                            >
                            <InputField
                                placeholder=""
                                value={values.fitting}
                                onChangeText={handleChange('fitting')}
                                className="text-base text-center placeholder:text-[#585858] placeholder:text-[16px] placeholder:font-normal placeholder:font-[PoppinsRegular] placeholder:leading-[24px]"
                            />
                        </Input>
                    </View>
                    <View className="flex flex-row justify-between items-center w-full mt-7">
                        <Text className="text-[23px] font-normal font-[PoppinsRegular] leading-[34.5px] text-[#585858]">Pant</Text>
                        <Input
                            variant="outline"
                            size="md"
                            isReadOnly={!params?.isEditMode}
                            className="bg-[#E7E7E7] w-[114px] rounded-[5px] h-[43px] focus:outline-none focus-within:ring-0 focus:border-transparent focus:ring-0"
                            >
                            <InputField
                                placeholder=""
                                value={values.pant}
                                onChangeText={handleChange('pant')}
                                className="text-base text-center placeholder:text-[#585858] placeholder:text-[16px] placeholder:font-normal placeholder:font-[PoppinsRegular] placeholder:leading-[24px]"
                            />
                        </Input>
                    </View>
                    <View className="flex flex-row justify-between items-center w-full mt-7">
                        <Text className="text-[23px] font-normal font-[PoppinsRegular] leading-[34.5px] text-[#585858]">Lap</Text>
                        <Input
                            variant="outline"
                            size="md"
                            isReadOnly={!params?.isEditMode}
                            className="bg-[#E7E7E7] w-[114px] rounded-[5px] h-[43px] focus:outline-none focus-within:ring-0 focus:border-transparent focus:ring-0"
                            >
                            <InputField
                                placeholder=""
                                value={values.lap}
                                onChangeText={handleChange('lap')}
                                className="text-base text-center placeholder:text-[#585858] placeholder:text-[16px] placeholder:font-normal placeholder:font-[PoppinsRegular] placeholder:leading-[24px]"
                            />
                        </Input>
                    </View>
                    <View className="flex flex-row justify-between items-center w-full mt-7">
                        <Text className="text-[23px] font-normal font-[PoppinsRegular] leading-[34.5px] text-[#585858]">Paincha</Text>
                        <Input
                            variant="outline"
                            size="md"
                            isReadOnly={!params?.isEditMode}
                            className="bg-[#E7E7E7] w-[114px] rounded-[5px] h-[43px] focus:outline-none focus-within:ring-0 focus:border-transparent focus:ring-0"
                            >
                            <InputField
                                placeholder=""
                                value={values.paincha}
                                onChangeText={handleChange('paincha')}
                                className="text-base text-center placeholder:text-[#585858] placeholder:text-[16px] placeholder:font-normal placeholder:font-[PoppinsRegular] placeholder:leading-[24px]"
                            />
                        </Input>
                    </View>
                    <Button className="h-[66px] rounded-[3px] mt-10" buttonTextStyles="text-[22px] uppercase" onPress={()=>handleSubmit()} title="Next"/>
                </ScrollView>
                }
        </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
  },
});

export default EditDetail;
