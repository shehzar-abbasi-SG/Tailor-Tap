import React from 'react'
import { View, Text, StyleProp, TextStyle } from "react-native";
import { twMerge } from 'tailwind-merge';

type THeadingProps={
  className?:string;
  title:string
  titleStyles?:string,
  underlineStyles?:string
  titleTextStylesObject?: StyleProp<TextStyle>
}
function Heading({className="",title,titleStyles="",underlineStyles='',titleTextStylesObject={}}:THeadingProps) {
  return (
    <View className={twMerge("w-[220px]",className)}>
        <Text style={titleTextStylesObject} className={twMerge("uppercase font-bold text-[22px] leading-[33px] text-center font-[PoppinsBold]",titleStyles)}>{title}</Text>
        <View className={twMerge("h-[3px] bg-[#38D55B] w-full",underlineStyles)}/>
    </View>
  )
}

export default Heading