import React, { useEffect, useState } from 'react'
import SplashScreen from "@/app/screens/Splash"
import * as Font from "expo-font";
import { GluestackUIProvider } from '../components/ui/gluestack-ui-provider';
import { View ,StyleSheet, I18nManager} from 'react-native';
import NavigationContainer from "@/app/components/navigation/Navigation"
import { useAppContext } from '../context/AppProvider';
import { getAuthData } from '../utils/auth';
import Logo from "@/assets/images/logo.svg"
import { SafeAreaProvider } from 'react-native-safe-area-context';



function Main() {
    const [isFontsLoadingLazy, setIsFontLoadingLazy] = useState(true);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const {setIsAuthenticated} = useAppContext()

    const loadFonts = async () => {
      await Font.loadAsync({
        PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
        PoppinsBold: require("../../assets/fonts/Poppins-Bold.ttf"),
        PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
        PoppinsSemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
        InterRegular: require("../../assets/fonts/Inter-Regular.ttf"),
        InterBold: require("../../assets/fonts/Inter-Bold.ttf"),
        InterMedium: require("../../assets/fonts/Inter-Medium.ttf"),
        InterSemiBold: require("../../assets/fonts/Inter-SemiBold.ttf"),
      });
      setFontsLoaded(true);
    };
    const checkAuthentication = async () => {
        setIsLoading(true)
        const authData = await getAuthData();
        if (authData) {
            setIsAuthenticated(true);
        }
        setIsLoading(false)
    };
    useEffect(() => {
      loadFonts();
      checkAuthentication()

    }, []);
    useEffect(() => {
      if(!fontsLoaded) return
      const timer = setTimeout(() => {
        setIsFontLoadingLazy(false);
      }, 3000); //show splash for 3 seconds
      return () => clearTimeout(timer);
    }, [fontsLoaded]);
   
  
    if (!fontsLoaded) {
      return <GluestackUIProvider mode="light"><View style={styles.container}><Logo/></View></GluestackUIProvider>;
    }
    else if (isFontsLoadingLazy && isLoading) {
      return <GluestackUIProvider mode="light"><SplashScreen /></GluestackUIProvider>;
    }
  return (
    <GluestackUIProvider mode="light"><SafeAreaProvider><NavigationContainer/></SafeAreaProvider></GluestackUIProvider>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#38D55B',
      alignItems:'center',
      justifyContent:"center"
    },
  });

export default Main