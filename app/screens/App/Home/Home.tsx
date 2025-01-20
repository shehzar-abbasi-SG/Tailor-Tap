import React, { useEffect, useState } from "react";
import { View, StyleSheet,Text, TouchableHighlight, TouchableOpacity, Platform } from "react-native";
import ChooseLanguage from "@/app/screens/App/Home/ChooseLanguage";
import Layout from "@/app/components/common/Layout";
import { Box } from "@/app/components/ui/box";
import AntDesignIcon from '@expo/vector-icons/AntDesign';
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "@/app/components/ui/image";
import { HomeScreenNavigationProp } from "@/app/types/navigation";
import Header from "@/app/components/common/Header";
import { rtlLanguages, useAppContext } from "@/app/context/AppProvider";
import { useUser } from "@/app/context/UserContext";
import { getAuthData } from "@/app/utils/auth";
import { useCustomer } from "@/app/context/CustomerContext";
import { Spinner } from "@/app/components/ui/spinner";
import Button from "@/app/components/common/Button";
import { getLanguagePreference } from "@/app/utils/language";

interface IHomeNavigationProps {
    navigation: HomeScreenNavigationProp;
  }

  // const customers = [
  //   {
  //     _id: "1",    
  //     fullName: "Shehzar Abbasi",  
  //     phoneNumber: "123445555"
      
  //   },
  //   {
  //     _id: "2",    
  //     fullName: "Shahzaib Aur",  
  //     phoneNumber: "123445555"
      
  //   },
  //   {
  //     _id: "3",    
  //     fullName: "Munazzem Khan",  
  //     phoneNumber: "123445555"
      
  //   },
  //   {
  //     _id: "4",    
  //     fullName: "Usaib khan",  
  //     phoneNumber: "123445555"
      
  //   },
  //   {
  //     _id: "5",    
  //     fullName: "Habeeb Dashti",  
  //     phoneNumber: "123445555"
      
  //   },
  //   {
  //     _id: "6",    
  //     fullName: "Hussam ",  
  //     phoneNumber: "123445555"
      
  //   },
  //   {
  //     _id: "7",    
  //     fullName: "Zeeshan Ahmed",  
  //     phoneNumber: "123445555"
      
  //   },
  //   {
  //     _id: "8",    
  //     fullName: "Kanwar Ammar",  
  //     phoneNumber: "123445555"
      
  //   }
  // ]
const HomeScreen = ({navigation}:IHomeNavigationProps) => {
    const [showLanguageSelectionView,setShowLanguageSelectionView] = useState(false)
    const closeLanguageSelectionView =()=>{
        setShowLanguageSelectionView(false)
    }
    const {isAuthenticated,i18n,changeLanguage} = useAppContext()
    const {getUserDetails} = useUser()
    const {customers,getCustomers,isCustomerLoading,getCustomerById} = useCustomer()
    useEffect(() => {
      if(!isAuthenticated) return
      const fetchUserDetails = async () => {
        try {
          const authData = await getAuthData();
          if(!authData) return
          await getUserDetails(authData.userId);
        } catch (error) {
        }
      };
      fetchUserDetails();
      getCustomers()

    }, [isAuthenticated]);

    useEffect(()=>{
      const fetchPreferedLanguage = async()=>{
        const preferredLanguage= await getLanguagePreference()
        if (preferredLanguage) {
          changeLanguage(preferredLanguage as "en"|"ur"|"sd")
        }else{
          setShowLanguageSelectionView(true)
        }
      }
      fetchPreferedLanguage()
     
    },[])
  return (
    <Layout scrollable={false}>
      {showLanguageSelectionView?
        <ChooseLanguage languageSelectionView={showLanguageSelectionView} closeLanguageSelectionView={closeLanguageSelectionView}/>
      :
      <>
        <Header onBackPress={()=>{}}/>
        <View style={styles.container}>
          <TouchableHighlight onPress={()=>navigation.navigate('ClientForm')} underlayColor={"#38D55B"} className="w-full">
            <Box className="bg-[#38D55B] h-[138px] w-full max-w-[400px] rounded-[7px] flex items-center gap-y-[22px] p-5">
              <TouchableHighlight onPress={()=>navigation.navigate("ClientForm")} className="bg-[#36BC54] flex-shrink-0 rounded-full h-[46px] w-[46px] flex items-center justify-center">
                <AntDesignIcon name="plus" color={"white"} size={30}/>
              </TouchableHighlight>
              <Text className="text-white font-semibold text-lg font-[PoppinsSemiBold] flex-shrink-0" style={{
                  lineHeight: rtlLanguages.includes(i18n.locale) ? 42 : 28,
                  writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
              }}>{i18n.t('add_new_member')}</Text>
            </Box>
          </TouchableHighlight>
          <Box className="bg-transparent border-[#36BC54] border-[2px] h-[77px] w-full max-w-[400px] rounded-[7px] flex items-center gap-y-[22px] justify-center">
              <Text
              style={{
                lineHeight: rtlLanguages.includes(i18n.locale) ? 42 : 28,
                writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
              }}
              className="font-[InterMedium] font-medium leading-[22px] text-lg">{i18n.t('watch_previous_data')}</Text>
          </Box>
          <View className="w-full">
            <Text className="font-[InterBold] text-[21px] font-bold mt-[26px] w-full"
            style={{
              textAlign:rtlLanguages.includes(i18n.locale)?'right':'left',
              lineHeight: rtlLanguages.includes(i18n.locale) ? 75 : 25,
              writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
            }}
            >{i18n.t('my_clients')}</Text>
            {isCustomerLoading? 
              <View className="mt-[100px]">
                <Spinner />
              </View>
            :
              <ScrollView 
                  contentContainerStyle={{ flexGrow: 1,paddingBottom: Platform.OS==='ios' ? 350:400 }}
                  showsVerticalScrollIndicator={false}
                >
                  {customers && customers.length>0 ?
                    customers.map((customer,index)=>(
                      <TouchableOpacity onPress={()=>getCustomerById(customer._id,false)} key={customer._id} className={`flex flex-row justify-between items-center w-full ${index===customers.length-1 ? "" :"border-b"}  border-[#DCDCDC] py-[18px]`}>
                        <View className="flex flex-col gap-y-1">
                          <Text>{customer.fullName}</Text>
                          <Text>{customer.phoneNumber}</Text>
                        </View>
                        <Button 
                        onPress={()=>{
                          getCustomerById(customer._id,true)
                        }} 
                        title={i18n.t('edit')} 
                        className="mt-0 h-fit py-1 rounded-[6px]" 
                        buttonTextStyles="text-[17px] leading-[25.5px] normal-case p-0 font-bold font-[PoppinsBold]"
                        buttonTextStylesObject={{
                          lineHeight: rtlLanguages.includes(i18n.locale) ? 37.5 : 25,
                          writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
                        }}
                        />
                      </TouchableOpacity>
                    ))
                  : 
                    <>
                      <Image
                        source={require('@/assets/images/no_clients.png')}
                        alt="No Clients"
                        className="w-full h-auto"
                        resizeMode="contain" 
                      />
                      <Text className="text-sm font-medium font-[PoppinsMedium] text-[#A1A1A1] text-center mt-[-50px]"
                        style={{
                          lineHeight: rtlLanguages.includes(i18n.locale) ? 32 : 20,
                          writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
                        }}
                        >{i18n.t('no_client_created')}
                      </Text>
                     </>
                  } 
              </ScrollView>
            }
          </View>
        </View>
      </>
      }
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    rowGap:34,
    padding:40,
    marginTop:20

  },
 
});

export default HomeScreen;
