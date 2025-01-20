import Button from "@/app/components/common/Button";
import Layout from "@/app/components/common/Layout";
import UpgradeModal from "@/app/components/modals/UpgradeModal";
import { rtlLanguages, useAppContext } from "@/app/context/AppProvider";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ChooseLanguage from "./Home/ChooseLanguage";

const SettingsScreen = ({navigation}:any) => {
  const {setShowUpgradeModal,showUpgradeModal,setShowUpgradeStack} = useAppContext()
  const [showLanguageSelectionView,setShowLanguageSelectionView] = useState(false)
  const closeLanguageSelectionView =()=>{
    setShowLanguageSelectionView(false)
}
  const {i18n} = useAppContext()
  useEffect(()=>{
    ()=>
      {setShowUpgradeModal(false)
      closeLanguageSelectionView()}
  },[])
  return (
    <Layout>
       {showLanguageSelectionView?
        <ChooseLanguage languageSelectionView={showLanguageSelectionView} closeLanguageSelectionView={closeLanguageSelectionView}/>
      :
      <>
        <View style={styles.container}>
          <Text style={{
            ...styles.header,
            lineHeight: rtlLanguages.includes(i18n.locale) ? 55 : 25,
            writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
            textAlign:rtlLanguages.includes(i18n.locale) ? 'right' : 'left', 
          }}>{i18n.t("settings")}</Text>

          <Text
            style={{
              ...styles.sectionHeader,
              lineHeight: rtlLanguages.includes(i18n.locale) ? 55 : 25,
              writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
              textAlign:rtlLanguages.includes(i18n.locale) ? 'right' : 'left', 
            }}
          >{i18n.t('premium')}</Text>
          <Button 
            buttonTextStylesObject={{
              lineHeight: rtlLanguages.includes(i18n.locale) ? 36 : 25,
              writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
            }}
            onPress={() => setShowUpgradeModal(true)} title={i18n.t('upgrade_to_premium')}
            className={`mt-0 h-[45px] rounded-[4px] w-[230px] ${rtlLanguages.includes(i18n.locale) ? 'ml-auto' : ''}`}
            buttonTextStyles="text-[16px] leading-[24px] uppercase p-0" />
          

          <Text 
          style={{
            ...styles.sectionHeader,
            lineHeight: rtlLanguages.includes(i18n.locale) ? 55 : 25,
            writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
            textAlign:rtlLanguages.includes(i18n.locale) ? 'right' : 'left', 
          }}
          >{i18n.t('support')}</Text>

          <TouchableOpacity onPress={() => {}}>
            <Text 
            style={{
              ...styles.option,
              lineHeight: rtlLanguages.includes(i18n.locale) ? 50 : 24,
              writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
              textAlign:rtlLanguages.includes(i18n.locale) ? 'right' : 'left', 
            }}
            >{i18n.t('help_center')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Text 
            style={{
              ...styles.option,
              lineHeight: rtlLanguages.includes(i18n.locale) ? 50 : 24,
              writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
              textAlign:rtlLanguages.includes(i18n.locale) ? 'right' : 'left', 
            }}
            >{i18n.t('contact_us')}</Text>
          </TouchableOpacity>
          <Button 
            buttonTextStylesObject={{
              lineHeight: rtlLanguages.includes(i18n.locale) ? 36 : 25,
              writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
            }}
            onPress={() => setShowLanguageSelectionView(true)} title={i18n.t('switch_language')}
            className={`mt-0 h-[45px] rounded-[4px] w-[230px] ${rtlLanguages.includes(i18n.locale) ? 'ml-auto' : ''}`}
            buttonTextStyles="text-[16px] leading-[24px] p-0" />
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
    padding: 20,
    backgroundColor: '#FFF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  option: {
    fontSize: 16,
    paddingVertical: 10,
  },
  upgradeOption: {
    color: 'blue',
    fontWeight: 'bold',
  },
  logout: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 30,
  },
});

export default SettingsScreen;
