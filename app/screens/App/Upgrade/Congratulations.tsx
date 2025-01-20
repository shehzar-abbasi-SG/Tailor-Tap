import React, { useState } from "react";
import { View, StyleSheet,Text, TouchableHighlight } from "react-native";
import Layout from "@/app/components/common/Layout";
import { Image } from "@/app/components/ui/image";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "@/app/types/navigation";
import LottieView from 'lottie-react-native';
import Button from "@/app/components/common/Button";
import { rtlLanguages, useAppContext } from "@/app/context/AppProvider";

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList>;

interface IHomeNavigationProps {
    navigation: HomeScreenNavigationProp;
  }
const CongratulationScreen = ({navigation}:IHomeNavigationProps) => {
  const {setShowUpgradeStack,i18n} = useAppContext()

  return (
    <Layout scrollable={false}>
      <View style={styles.container}>
        <LottieView
            source={require('@/assets/animations/congratulation_gif.json')}
            autoPlay
            loop
            style={styles.animation}
        />
        <Text 
          style={{lineHeight: rtlLanguages.includes(i18n.locale) ? 65 : 42,
                writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
            }}
        className="w-full text-center font-bold font-[PoppinsBold] text-[28px] leading-[42px] text-white uppercase">{i18n.t('thank_you')}</Text>
        <Text 
        style={{lineHeight: rtlLanguages.includes(i18n.locale) ? 65 : 23,
          writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
      }}
        className="w-full text-center font-normal font-[PoppinsRegular] text-[23px] leading-[34.5px] text-white">{i18n.t('submission_done')}</Text>
        <Button 
         buttonTextStylesObject={{
                    lineHeight: rtlLanguages.includes(i18n.locale) ? 65 : 34.5,
                    writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
                }}
        className="w-full mt-[100px] h-[66px] rounded-[7px] bg-white" 
        buttonTextStyles="text-[22px] leading-[33px] uppercase p-0 text-[#38D55B]" onPress={()=>{setShowUpgradeStack(false)}} 
        title={i18n.t('done')}/>

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
