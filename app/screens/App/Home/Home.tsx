import React, { useState } from "react";
import { View, StyleSheet,Text, TouchableHighlight } from "react-native";
import ChooseLanguage from "@/app/components/ChooseLanguage";
import Layout from "@/app/components/common/Layout";
import { Box } from "@/app/components/ui/box";
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "@/app/components/ui/image";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "@/app/types/navigation";
import Header from "@/app/components/common/Header";
import UpgradeModal from "@/app/components/upgrade_modal/UpgradeModal";
import { useAppContext } from "@/app/context/AppProvider";


type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'HomeMain'>;

interface IHomeNavigationProps {
    navigation: HomeScreenNavigationProp;
  }
const HomeScreen = ({navigation}:IHomeNavigationProps) => {
    const [showLanguageSelectionView,setShowLanguageSelectionView] = useState(true)
    const closeLanguageSelectionView =()=>{
        setShowLanguageSelectionView(false)
    }
    const {showUpgradeModal,setShowUpgradeModal,setShowUpgradeStack} = useAppContext()
    const clients = []
  return (
    <Layout scrollable={false}>
      {showLanguageSelectionView?
        <ChooseLanguage languageSelectionView={showLanguageSelectionView} closeLanguageSelectionView={closeLanguageSelectionView}/>
      :
      <>
        <Header onBackPress={()=>{}} onVideoPress={()=>{}}/>
        <View style={styles.container}>
          <TouchableHighlight onPress={()=>navigation.navigate('ClientForm')} underlayColor={"#38D55B"} className="w-full">
            <Box className="bg-[#38D55B] h-[138px] w-full max-w-[400px] rounded-[7px] flex items-center gap-y-[22px] p-5">
              <TouchableHighlight onPress={()=>navigation.navigate("ClientForm")} className="bg-[#36BC54] flex-shrink-0 rounded-full h-[46px] w-[46px] flex items-center justify-center">
                <AntDesignIcon name="plus" color={"white"} size={30}/>
              </TouchableHighlight>
              <Text className="text-white font-semibold text-lg font-[PoppinsSemiBold] flex-shrink-0">Add New Member</Text>
            </Box>
          </TouchableHighlight>
          <Box className="bg-transparent border-[#36BC54] border-[2px] h-[77px] w-full max-w-[400px] rounded-[7px] flex items-center gap-y-[22px] justify-center">
              <Text className="font-[InterMedium] font-medium leading-[22px] text-lg">Watch previous data</Text>
          </Box>
          <View className="w-full">
            <Text className="font-[InterBold] text-[21px] font-bold leading-[25px] mt-[26px] w-full">My Clients</Text>
            <ScrollView className="">
                {clients.length===0 && 
                <>
                <Image
                  source={require('@/assets/no_clients.png')}
                  alt="No Clients"
                  className="w-full h-auto"
                  resizeMode="contain" 
                />
                <Text className="text-sm font-medium font-[PoppinsMedium] text-[#A1A1A1] text-center mt-[-50px]">No Client has been created yet..</Text>
                </>
                } 

            </ScrollView>
          </View>
        </View>
        {/* Plan upgrade modal */}
        <UpgradeModal showModal={showUpgradeModal} setShowModal={setShowUpgradeModal} onClickUpgrade={()=>setShowUpgradeStack(true)}/>

      </>
      }
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    rowGap:34,
    padding:40,
    marginTop:20

  },
 
});

export default HomeScreen;
