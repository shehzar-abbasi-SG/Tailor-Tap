import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight } from "react-native";
import Heading from "./common/Heading";
import AntDesignIcon from "react-native-vector-icons/AntDesign"
import IonIcons from "react-native-vector-icons/Ionicons"
import { Button, ButtonIcon, ButtonSpinner, ButtonText } from "./ui/button";


const initialLanguages = [
    { id: '1', name: 'English' },
    { id: '2', name: 'Urdu' },
    { id: '3', name: 'Sindhi' },
  ];

type TChooseLanguageProps={
    closeLanguageSelectionView:()=>void
    languageSelectionView:boolean
}
const ChooseLanguage = ({closeLanguageSelectionView,languageSelectionView}:TChooseLanguageProps) => {
   const [selectedLanguage,setSelectedLanguage] = useState<{name:string,id:string}>(()=>initialLanguages[0])
   const handleLanguageChange = (id:string) => {
    const language = initialLanguages.find(lang => lang.id === id);
    setSelectedLanguage(language!);
  };
  const handleContinue = ()=>{
    console.log('continue ==>');
  }
  
  return (
    <View className={`${languageSelectionView?"flex-1":"hidden"}  gap-y-[100px] items-center bg-white w-full px-10 pt-[100px]`}>
        {/* Close Button */}
        <TouchableHighlight underlayColor={"#38D55B"} onPress={closeLanguageSelectionView} className="bg-[#38D55B] flex items-center justify-center w-[30px] h-[30px] absolute top-5 right-10 rounded-full">
            <IonIcons name="close" size={25}/>
        </TouchableHighlight>
       <Heading title="Choose Language"/>
       <View className="flex gap-y-[50] w-full">
            {initialLanguages.map(({name,id})=>(
                <TouchableHighlight underlayColor="#D5E8D6" onPress={()=>handleLanguageChange(id)} key={id} className={`flex flex-row items-center justify-between ${id===selectedLanguage.id?"bg-[#D5E8D6]":"bg-white"} px-[27px] py-[21px] w-full rounded-[4px]`} style={{
                    boxShadow:"0px 4px 8.2px 0px #00000066"
                }}>
                    <>
                        <Text className="font-medium text-[24px] font-[InterMedium] leading-[29.05px] ">{name}</Text>
                        <View className={`bg-[#38D55B] rounded-full flex items-center justify-center flex-shrink-0 w-[30px] h-[30px] ${id===selectedLanguage.id?"opacity-[1]":"opacity-[0]"} transition-opacity duration-200`}>
                            <AntDesignIcon  name="check" size={25}/>
                        </View>
                    </>
                </TouchableHighlight>
            ))}
            <Button onPress={closeLanguageSelectionView} className="mt-[10px] bg-[#38D55B] h-[65px] rounded-[4px]"  variant="solid" action="primary">
              <ButtonText className="text-white font-[PoppinsBold] font-bold text-[22px] leading-[33px] uppercase text-center py-4">Continue</ButtonText>
            </Button>
        </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
  },
});

export default ChooseLanguage;
