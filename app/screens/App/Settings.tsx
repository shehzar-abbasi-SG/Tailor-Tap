import Button from "@/app/components/common/Button";
import Layout from "@/app/components/common/Layout";
import UpgradeModal from "@/app/components/modals/UpgradeModal";
import { useAppContext } from "@/app/context/AppProvider";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const SettingsScreen = ({navigation}:any) => {
  const {setShowUpgradeModal,showUpgradeModal,setShowUpgradeStack} = useAppContext()

  useEffect(()=>{
    ()=>setShowUpgradeModal(false)
  },[])
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.header}>Settings</Text>

        <Text style={styles.sectionHeader}>Premium</Text>
        <Button onPress={() => setShowUpgradeModal(true)} title="Upgrade to Premium" 
        className="mt-0 h-[45px] rounded-[4px] w-[230px]" 
        buttonTextStyles="text-[16px] leading-[24px] uppercase p-0" />

        <Text style={styles.sectionHeader}>Support</Text>

        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.option}>Help Center</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.option}>Contact Us</Text>
        </TouchableOpacity>
      </View>
      {/* Plan upgrade modal */}
      <UpgradeModal showModal={showUpgradeModal} setShowModal={setShowUpgradeModal} onClickUpgrade={()=>setShowUpgradeStack(true)}/>
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
