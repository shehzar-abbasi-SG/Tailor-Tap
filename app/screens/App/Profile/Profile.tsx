import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Layout from '@/app/components/common/Layout'
import Header from '@/app/components/common/Header'
import { useAuth } from "@/app/context/AuthContext";
import { Image } from "@/app/components/ui/image";
import { Button, ButtonText } from "@/app/components/ui/button";
import { useUser } from "@/app/context/UserContext";
import { ProfileStackParamList } from "@/app/types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";

type ProfileScreenNavigationProp = StackNavigationProp<ProfileStackParamList>;

interface IProfileNavigationProps {
    navigation: ProfileScreenNavigationProp;
}

const ProfileScreen = ({navigation}:IProfileNavigationProps) => {
  const {logout} = useAuth()
  const {userDetails} = useUser()
  return (
    <Layout scrollable={false}>
      <View className='relative' style={styles.container}>
        <View className='w-full z-10 absolute top-5'>
          <Header onBackPress={()=>{}} className="px-0"/>
        </View>
        <View className='flex items-center justify-center gap-y-4 absolute inset-0 bg-[#38D55B] rounded-b-[82px] h-[260px]'>
          <View className="relative h-full w-full">
            <View className="absolute bottom-[-120px] left-1/2 -translate-x-1/2 flex items-center justify-center">
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
              <Button onPress={()=>navigation.navigate('EditProfile')} className="border-[2px] border-[#38D55B] bg-transparent mt-[17px] rounded-full h-[23px] w-[75px] p-0 self-center">
                  <ButtonText className="font-[PoppinsBold] font-bold text-[9px] leading-[13.5px] uppercase text-black">
                    Edit Profile
                  </ButtonText>
              </Button>
            </View>
          </View>
        </View>
        <View className="w-full flex items-center justify-center">
          <Button className="border-[2px] border-[#38D55B] bg-transparent rounded-full h-[23px] w-[75px] p-0 self-center">
            <ButtonText 
            onPress={logout}
            className="font-[PoppinsBold] font-bold text-[9px] leading-[13.5px] uppercase text-black">
              Logout
            </ButtonText>
          </Button>
        </View>
      </View>
    </Layout>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding:40,
    overflow:'visible',
    backgroundColor: "#fff",
  },
});


export default ProfileScreen;
