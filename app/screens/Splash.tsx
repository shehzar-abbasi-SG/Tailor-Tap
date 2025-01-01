import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Logo from "@/assets/images/logo.svg"

const SplashScreen = () => {
  return (
    <View className="flex-1 items-center justify-center bg-[#38D55B]">
      <Logo/>
      <Text className="font-medium text-[32px] leading-[150%]">Tailor Tap</Text>
    </View>
  );
};


export default SplashScreen;
