import React from 'react'
import { View, Text } from "react-native";
import { twMerge } from 'tailwind-merge';

type THeadingProps={
  className?:string;
  title:string
  titleStyles?:string,
  underlineStyles?:string
}
function Heading({className="",title,titleStyles="",underlineStyles=''}:THeadingProps) {
  return (
    <View className={twMerge("w-[220px]",className)}>
        <Text className={twMerge("uppercase font-bold text-[22px] leading-[33px] text-center font-[PoppinsBold]",titleStyles)}>{title}</Text>
        <View className={twMerge("h-[3px] bg-[#38D55B] w-full",underlineStyles)}/>
    </View>
  )
}

export default Heading