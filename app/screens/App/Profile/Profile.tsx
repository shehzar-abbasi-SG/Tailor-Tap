import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Layout from '@/app/components/common/Layout'
import Header from '@/app/components/common/Header'
import { useAuth } from "@/app/context/AuthContext";
import { Image } from "@/app/components/ui/image";
import { Button, ButtonText } from "@/app/components/ui/button";
import { useUser } from "@/app/context/UserContext";
import { ProfileStackParamList } from "@/app/types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { rtlLanguages, useAppContext } from "@/app/context/AppProvider";

type ProfileScreenNavigationProp = StackNavigationProp<ProfileStackParamList>;

interface IProfileNavigationProps {
    navigation: ProfileScreenNavigationProp;
}

const ProfileScreen = ({navigation}:IProfileNavigationProps) => {
  const {logout} = useAuth()
  const {userDetails} = useUser()
  const {i18n} = useAppContext()
  return (
    <Layout scrollable={false}>
      <View style={styles.container}>
        <View className="bg-[#38D55B] px-10 rounded-b-[82px] h-[260px]">
          <View className='w-full z-10 top-5'>
            <Header onBackPress={()=>{}} className="px-0"/>
          </View>
          <View className="relative h-full w-full">
            <View className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 flex items-center justify-center gap-x-10">
              <View className="flex items-center justify-center w-[78px] h-[78px] bg-[#D9D9D9] rounded-full border-[6px] border-white">
                  <Image
                    source={require('@/assets/images/user_icon.png')}
                    alt="user icon"
                    className="h-[43px] w-[433px]"
                    resizeMode="contain" 
                  />
              </View>
              <Text className="text-[15px] font-normal font-[PoppinsRegular] leading-[22.5px] text-[#000]">
                {userDetails?.name}
              </Text>
              <Text className="text-[8px] text-[#606060] font-normal font-[PoppinsRegular] leading-[12px]">
                {userDetails?.phoneNumber}
              </Text>
              <Button onPress={()=>navigation.navigate('EditProfile')} className="border-[2px] border-[#38D55B] bg-transparent mt-[17px] rounded-full h-fit w-fit px-2 py-1 self-center">
                  <Text 
                    style={{
                        textAlign: rtlLanguages.includes(i18n.locale) ? 'right' : 'left',
                        writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
                    }}
                  className="font-[PoppinsBold] font-bold text-[9px] leading-[18px] uppercase text-black">
                   {i18n.t('edit_profile')}
                  </Text>
              </Button>
              <Button onPress={logout} className="border-[2px] border-[#38D55B] bg-transparent rounded-full h-fit w-fit px-3 py-1 mt-[17px]">
                  <Text 
                   style={{
                    textAlign: rtlLanguages.includes(i18n.locale) ? 'right' : 'left',
                    writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
                  }}
                  className="font-[PoppinsBold] font-bold text-[9px] leading-[18px] uppercase text-black text-center">{i18n.t('logout')}</Text>
              </Button>
            </View>
          </View>
        </View>
       
      </View>
    </Layout>
  )
};

const styles = StyleSheet.create({
  container: {
    overflow:'visible',
    backgroundColor: "#fff",
  },
});


export default ProfileScreen;
