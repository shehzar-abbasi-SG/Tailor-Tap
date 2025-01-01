import React from "react";
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

const selectedPerson = 
    {name:"Person's Name",phone:"0334 567 7890",}

type SearchScreenNavigationProp = StackNavigationProp<SearchStackParamList>;

interface ISearchNavigationProps {
    navigation: SearchScreenNavigationProp;
  }
const EditPhotos = ({navigation}:ISearchNavigationProps) => {
    
const validationSchema = Yup.object({
    images: Yup.array().of(
        Yup.string().required('Image is required')
      ).required('At least one image is required')
     
   });
   const {errors,handleSubmit,touched,values,setFieldValue} = useFormik({
    initialValues: {
      images:[]
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    //   navigation.navigate("EditPhotos")
    },
   });
   const handleRemoveImage = (indexToRemove: number) => {
        const updatedImages = values.images.filter((_, index) => index !== indexToRemove);
        setFieldValue('images', updatedImages);
   };
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsMultipleSelection: true,
        selectionLimit: 5 // Optional: limit number of images
        });
        if (!result.canceled) {
            const uris = result.assets.map(asset => asset.uri);
            console.log('uris :>> ', uris);
            setFieldValue("images",[...values.images, ...uris]);
        }
    };
    console.log('images ===> ', values.images);
  return (
    <Layout scrollable={false}>
        <Header onBackPress={()=>navigation.goBack()}/>
        <View style={styles.container} className="px-10 pt-[30px] w-full">
            <View className="w-full border-[1px] border-[#DCDCDC]" />
            <View className="flex flex-row justify-between items-center w-full py-[24px]">
                <View className="flex flex-col gap-y-1">
                  <Text>{selectedPerson.name}</Text>
                  <Text>{selectedPerson.phone}</Text>
                </View>
                <Button title="Edit" className="mt-0 h-[39px] rounded-[6px]" 
                buttonTextStyles="text-[17px] leading-[25.5px] normal-case p-0 font-bold font-[PoppinsBold]"  />
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
                            source={require("@/assets/placeholder_image.png")}
                            alt="File Upload"
                            className="w-full h-auto"
                            resizeMode="contain" 
                            />
                            <Text className='text-center text-black leading-[21px] font-normal text-[14px] font-[PoppinsRegular]'>
                            add photos from the device
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
                            <TouchableHighlight onPress={()=>handleRemoveImage(index)} className="absolute top-[-10px] right-[0px] bg-black w-[16px] h-[16px] rounded-full flex items-center justify-center">
                                <AntDesignIcon name="close" size={12} color={"#fff"}/>
                            </TouchableHighlight>
                        </View>
                        ))
                    }
                    </View>
                    <Button className="h-[66px] rounded-[3px] mt-10 w-full" buttonTextStyles="text-[22px] uppercase" onPress={()=>handleSubmit()} title="Save Changes"/>
            </ScrollView>
          </View> 
        </View>
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
