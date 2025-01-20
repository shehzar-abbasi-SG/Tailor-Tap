import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, TouchableHighlight } from "react-native";
import Layout from "@/app/components/common/Layout";
import Header from "@/app/components/common/Header";
import Button from "@/app/components/common/Button";
import { ScrollView } from 'react-native';
import { StackNavigationProp } from "@react-navigation/stack";
import {SearchStackParamList } from "@/app/types/navigation";
import * as Yup from "yup"
import { useFormik } from "formik";
import { Image } from '@/app/components/ui/image'
import * as ImagePicker from 'expo-image-picker';
import AntDesignIcon from "@expo/vector-icons/AntDesign"
import { useCustomer } from "@/app/context/CustomerContext";
import { useClientDetailFormContext } from "@/app/context/FormContext";
import ModalWrapper from "@/app/components/modals/Modal";
import { Box } from "@/app/components/ui/box";
import { useRoute } from "@react-navigation/native";
import { rtlLanguages, useAppContext } from "@/app/context/AppProvider";

type SearchScreenNavigationProp = StackNavigationProp<SearchStackParamList>;
export type TFile= {
  name: string;
  size: number | undefined;
  uri: string;
  type: string;
}[]
interface ISearchNavigationProps {
    navigation: SearchScreenNavigationProp;
  }
const EditPhotos = ({navigation}:ISearchNavigationProps) => {
  const {isCustomerLoading,updateCustomer,selectedCustomer,deleteCustomerImage,deleteCustomer} = useCustomer()
  const {updateClientFormData,setUpdateClientFormData} = useClientDetailFormContext()
  const [selectedImageIdToRemove,setSelectedImageIdToRemove] = useState<number>()
  const [showConfirmationModal,setShowConfirmationModal] = useState(false)
  const [uploadedFiles,setUploadedFiles] = useState<any>()
  const [showConfirmationModalDeleteClient,setShowConfirmationModalDeleteClient] = useState(false)
  const route = useRoute()
  const {i18n} = useAppContext()
  const {isEditMode}:any = route.params
  const validationSchema = Yup.object({
      images: Yup.array().of(
          Yup.string().required('Image is required')
        ).required('At least one image is required')
      
  });
  const {errors,handleSubmit,touched,values,setFieldValue} = useFormik({
    initialValues: {
      images:selectedCustomer?.images??[]
    },
    validationSchema,
    onSubmit: (values) => {
      if(!selectedCustomer) return
      updateCustomer(selectedCustomer._id , updateClientFormData,uploadedFiles)
    },
  });
  const openModal = (index:number) => {
    setSelectedImageIdToRemove(index);
    setShowConfirmationModal(true);
  };
  const closeModal = () => {
    setShowConfirmationModal(false);
    setSelectedImageIdToRemove(undefined);
  };
  const closeDeleteClientModal=()=>{
    setShowConfirmationModalDeleteClient(false)
  }
 
  const handleRemoveImage = async (index:number) => {
    const imageToRemove = values.images[index];
    const isServerImage = imageToRemove.startsWith("http") || imageToRemove.startsWith("https");
    if (isServerImage) {
      if(!selectedCustomer) return
      try {
          await deleteCustomerImage(selectedCustomer._id, imageToRemove);
        } catch (error) {
          console.log("Error removing server image:", error);
          return;
      }
     }
      setFieldValue("images", values.images.filter((_, i) => i !== index));
      setUpdateClientFormData((prev) => ({
        ...prev,
        images: (prev.images ?? []).filter((_, i) => i !== index),
      }));
      closeModal()
  };
  const pickImage = async () => {
      if(!isEditMode) return
      const response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 5 
      });
      if(response.canceled) return
      const uris = response.assets.map(asset => asset.uri);
      const fileUploaded = response.assets.map((asset)=>{
        const {fileName,fileSize,type,uri} = asset
        return {
          name: fileName??"unknown-image",
          size: fileSize,
          uri: uri,
          type: "application/" + type
        }
      });
      setUploadedFiles(fileUploaded)
      setFieldValue("images",[...values.images, ...uris]);
      setUpdateClientFormData((prev)=>({...prev,images:uris}))
  };

  return (
    <Layout scrollable={false}>
        <Header onBackPress={()=>navigation.goBack()}/>
        <View style={styles.container} className="px-10 pt-[30px] w-full">
            <View className="w-full border-[1px] border-[#DCDCDC]" />
            <View className="flex flex-row justify-between items-center w-full py-[24px]">
                <View className="flex flex-col gap-y-1">
                  <Text>{selectedCustomer?.fullName}</Text>
                  <Text>{selectedCustomer?.phoneNumber}</Text>
                </View>
                <Button onPress={()=>setShowConfirmationModalDeleteClient(true)} isLoading={isCustomerLoading} isDisabled={isCustomerLoading||!isEditMode} title={i18n.t('delete')} className="mt-0 h-[39px] rounded-[6px] bg-red-500 disabled:bg-red-300" 
                buttonTextStyles="text-[17px] leading-[25.5px] normal-case p-0 font-bold font-[PoppinsBold]" 
                buttonTextStylesObject={{
                lineHeight: rtlLanguages.includes(i18n.locale) ? 38 : 25.5,
                writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
              }}
                />
            </View>
            <View className="w-full border-[1px] border-[#DCDCDC]" />
           <View className="w-full mt-[48px]">
            <ScrollView 
                contentContainerStyle={{ flexGrow: 1,paddingTop:20,paddingBottom:100, }}
                showsVerticalScrollIndicator={false}
                >
                <Pressable onPress={pickImage} className='w-full flex gap-y-[17px]'>
                    <View className='bg-white w-full h-[202px] rounded-[4px] items-center justify-center flex gap-y-[17px] px-[60px]' style={{
                        boxShadow:"0px 2px 8.2px 0px #0000004D"
                    }}>
                        <Image
                        source={require("@/assets/images/placeholder_image.png")}
                        alt="File Upload"
                        className="w-full h-auto"
                        resizeMode="contain" 
                        />
                        <Text 
                        style={{
                            lineHeight: rtlLanguages.includes(i18n.locale) ? 45 : 21,
                            writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
                        }}
                        className='text-center text-black leading-[21px] font-normal text-[14px] font-[PoppinsRegular]'>
                       {i18n.t('add_photos_from_device')}
                        </Text>
                    </View>
                    {touched.images && errors.images && (
                      <Text className="font-[PoppinsRegular] text-sm mt-1 text-red-500">{errors.images}</Text>
                    )}
                </Pressable>   
                    <View className="flex flex-row flex-wrap gap-[10px] mt-10 ">
                    {values.images.length>0 && values.images.map((img,index)=>(
                        <View className="relative h-[66px] w-[75px]" key={index} >
                            <Image
                                source={{uri:img}}
                                alt="File Upload"
                                resizeMode="cover" 
                                size='md'
                                width={75}
                                height={66}
                            /> 
                            {isEditMode &&
                            <TouchableHighlight onPress={()=>openModal(index)} className="absolute top-[-10px] right-[0px] bg-black w-[16px] h-[16px] rounded-full flex items-center justify-center">
                                <AntDesignIcon name="close" size={12} color={"#fff"}/>
                            </TouchableHighlight>
                          }
                        </View>
                        ))
                    }
                    </View>
                    <Button 
                    buttonTextStylesObject={{
                      lineHeight: rtlLanguages.includes(i18n.locale) ? 45 : 30,
                      writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
                    }}
                    isLoading={isCustomerLoading} isDisabled={isCustomerLoading||!isEditMode} className="h-[66px] rounded-[3px] mt-10" buttonTextStyles="text-[22px] uppercase" onPress={()=>handleSubmit()} title={i18n.t('save_changes')}/>
            </ScrollView>
          </View> 
        </View>
        <ModalWrapper showModal={showConfirmationModal} onClose={closeModal}>
          <Box className='flex gap-[23px] items-center justify-center'>
              <Text style={{
                  lineHeight: rtlLanguages.includes(i18n.locale) ? 45 : 21,
                  writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
              }}className='mt-[5px] font-medium text-[14px] leading-[21px] text-center font-[PoppinsMedium]'>
                  {i18n.t('delete_confirmation')}
              </Text>
              <View className='w-full flex flex-row items-center justify-center gap-x-[10px]'>
                  <Button 
                    buttonTextStylesObject={{
                      lineHeight: rtlLanguages.includes(i18n.locale) ? 36 : 24,
                      writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
                    }}
                  isDisabled={isCustomerLoading} onPress={closeModal} title={i18n.t('cancel')} 
                      className="mt-0 h-[45px] rounded-[4px] bg-gray-400 disabled:bg-gray-400" 
                      buttonTextStyles="text-[16px] leading-[24px] uppercase p-0" />
                  <Button 
                  buttonTextStylesObject={{
                    lineHeight: rtlLanguages.includes(i18n.locale) ? 36 : 24,
                    writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
                  }}
                  isLoading={isCustomerLoading} isDisabled={isCustomerLoading} onPress={()=>{if(selectedImageIdToRemove!=undefined)handleRemoveImage(selectedImageIdToRemove)}} title={i18n.t('delete')} 
                      className="mt-0 h-[45px] rounded-[4px] bg-red-500 disabled:bg-red-300" 
                      buttonTextStyles="text-[16px] leading-[24px] uppercase p-0" />
              </View>
            
            </Box>
        </ModalWrapper>
        <ModalWrapper showModal={showConfirmationModalDeleteClient} onClose={closeDeleteClientModal}>
          <Box className='flex gap-[23px] items-center justify-center'>
              <Text 
              style={{
                lineHeight: rtlLanguages.includes(i18n.locale) ? 45 : 21,
                writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
            }}
              className='mt-[5px] font-medium text-[14px] leading-[21px] text-center font-[PoppinsMedium]'>
                  {i18n.t('delete_client_confirmation')}
              </Text>
              <View className='w-full flex flex-row items-center justify-center gap-x-[10px]'>
                  <Button 
                   buttonTextStylesObject={{
                    lineHeight: rtlLanguages.includes(i18n.locale) ? 36 : 24,
                    writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
                  }}
                  isDisabled={isCustomerLoading} onPress={closeDeleteClientModal} title={i18n.t('cancel')} 
                      className="mt-0 h-[45px] rounded-[4px] bg-gray-400 disabled:bg-gray-400" 
                      buttonTextStyles="text-[16px] leading-[24px] uppercase p-0" />
                  <Button 
                   buttonTextStylesObject={{
                    lineHeight: rtlLanguages.includes(i18n.locale) ? 36 : 24,
                    writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
                  }}
                  isLoading={isCustomerLoading} isDisabled={isCustomerLoading} onPress={()=>{if(selectedCustomer) deleteCustomer(selectedCustomer._id)}} title={i18n.t('delete')} 
                      className="mt-0 h-[45px] rounded-[4px] bg-red-500 disabled:bg-red-300" 
                      buttonTextStyles="text-[16px] leading-[24px] uppercase p-0" />
              </View>
            
            </Box>
        </ModalWrapper>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
  },
});

export default EditPhotos;
