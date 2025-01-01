import React, { useState } from "react";
import { View, StyleSheet,Text, TouchableHighlight } from "react-native";
import Layout from "@/app/components/common/Layout";
import { Image } from "@/app/components/ui/image";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "@/app/types/navigation";
import LottieView from 'lottie-react-native';
import Button from "@/app/components/common/Button";
import { useAppContext } from "@/app/context/AppProvider";

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList>;

interface IHomeNavigationProps {
    navigation: HomeScreenNavigationProp;
  }
const CongratulationScreen = ({navigation}:IHomeNavigationProps) => {
  const {setShowUpgradeStack} = useAppContext()

  return (
    <Layout scrollable={false}>
      <View style={styles.container}>
        <LottieView
            source={require('@/assets/animations/congratulation_gif.json')}
            autoPlay
            loop
            style={styles.animation}
        />
        <Text className="w-full text-center font-bold font-[PoppinsBold] text-[28px] leading-[42px] text-white uppercase">THANK YOU VERY MUCH!</Text>
        <Text className="w-full text-center font-normal font-[PoppinsRegular] text-[23px] leading-[34.5px] text-white">Your Submitting has been done!</Text>
        <Button className="w-full mt-[100px] h-[66px] rounded-[7px] bg-white" 
        buttonTextStyles="text-[22px] leading-[33px] uppercase p-0 text-[#38D55B]" onPress={()=>{setShowUpgradeStack(false)}} 
        title="Done"/>

      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#38D55B",
    rowGap:12,
    padding:40,
  },
  animation: {
    width: 300,
    height: 300,
  },

 
});

export default CongratulationScreen;
