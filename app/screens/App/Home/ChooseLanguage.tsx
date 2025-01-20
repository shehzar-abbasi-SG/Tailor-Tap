import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight } from "react-native";
import Heading from "../../../components/common/Heading";
import AntDesignIcon from "@expo/vector-icons/AntDesign"
import IonIcons from "@expo/vector-icons/Ionicons"
import { Button, ButtonIcon, ButtonSpinner, ButtonText } from "../../../components/ui/button";
import { rtlLanguages, useAppContext } from "@/app/context/AppProvider";


type TLanguage={
  id:string,name:string,locale:"ur"|"en"|"sd"
}


type TChooseLanguageProps={
    closeLanguageSelectionView:()=>void
    languageSelectionView:boolean
}
const ChooseLanguage = ({closeLanguageSelectionView,languageSelectionView}:TChooseLanguageProps) => {
  const {locale,i18n} = useAppContext()
   const [selectedLanguage,setSelectedLanguage] = useState<TLanguage>()
   const {changeLanguage} = useAppContext()
   const languages:TLanguage[] = useMemo(()=>[
    { id: '1', name: i18n.t("english"),locale:'en' },
    { id: '2', name: i18n.t("urdu") ,locale:'ur'},
    { id: '3', name: i18n.t("sindhi"),locale:'sd' },
  ],[i18n]);

   const handleLanguageChange = (id:string) => {
    const language = languages.find(lang => lang.id === id);
    setSelectedLanguage(language!);
  };
  const handleContinue=()=>{
    if(selectedLanguage)
    changeLanguage(selectedLanguage.locale)
    closeLanguageSelectionView()
  }
  useEffect(()=>{
    if(locale) setSelectedLanguage(languages.find(language=>language.locale===locale)??languages[0])
  },[locale])
  return (
    <View className={`${languageSelectionView?"flex-1":"hidden"}  gap-y-[100px] items-center bg-white w-full px-10 pt-[100px]`}>
        {/* Close Button */}
        <TouchableHighlight underlayColor={"#38D55B"} onPress={closeLanguageSelectionView} className="bg-[#38D55B] flex items-center justify-center w-[30px] h-[30px] absolute top-5 right-10 rounded-full">
            <IonIcons name="close" size={25}/>
        </TouchableHighlight>
       <Heading 
        titleTextStylesObject={{
        lineHeight: rtlLanguages.includes(i18n.locale) ? 40 : 25,
        writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
       }}
       title={i18n.t('choose_language')}/>
       <View className="flex gap-y-[50] w-full">
            {languages.map(({name,id,locale})=>(
                <TouchableHighlight underlayColor="#D5E8D6" onPress={()=>handleLanguageChange(id)} key={id} className={`flex ${rtlLanguages.includes(i18n.locale)?"flex-row-reverse":"flex-row"}  items-center justify-between ${id===selectedLanguage?.id?"bg-[#D5E8D6]":"bg-white"} px-[27px] py-[21px] w-full rounded-[4px]`} style={{
                    boxShadow:"0px 4px 8.2px 0px #00000066"
                }}>
                    <>
                        <Text className="font-medium text-[24px] font-[InterMedium] leading-[29.05px]">{name}</Text>
                        <View className={`bg-[#38D55B] rounded-full flex items-center justify-center flex-shrink-0 w-[30px] h-[30px] ${id===selectedLanguage?.id?"opacity-[1]":"opacity-[0]"} transition-opacity duration-200`}>
                            <AntDesignIcon  name="check" size={25}/>
                        </View>
                    </>
                </TouchableHighlight>
            ))}
            <Button onPress={handleContinue} className="mt-[10px] bg-[#38D55B] h-[65px] rounded-[4px]"  variant="solid" action="primary">
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
