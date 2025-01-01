import "@/global.css";
import { GluestackUIProvider } from "@/app/components/ui/gluestack-ui-provider";
import { StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import SplashScreen from "@/app/screens/Splash"
import * as Font from "expo-font";
import "react-native-gesture-handler";
import NavigationContainer  from "@/app/components/navigation/Navigation";
import { AppProvider } from "./context/AppProvider";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
      PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
      PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
      PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
      InterRegular: require("../assets/fonts/Inter-Regular.ttf"),
      InterBold: require("../assets/fonts/Inter-Bold.ttf"),
      InterMedium: require("../assets/fonts/Inter-Medium.ttf"),
      InterSemiBold: require("../assets/fonts/Inter-SemiBold.ttf"),


    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);


  useEffect(() => {
    if(!fontsLoaded) return
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); //show splash for 3 seconds
    return () => clearTimeout(timer);
  }, [fontsLoaded]);
 

  if (!fontsLoaded) {
    return <GluestackUIProvider mode="light"><View style={styles.container}/></GluestackUIProvider>;
  }
  else if (isLoading) {
    return <GluestackUIProvider mode="light"><SplashScreen /></GluestackUIProvider>;
  }
  return (
      <GluestackUIProvider mode="light">
        <AppProvider>
          <NavigationContainer/>
        </AppProvider>
      </GluestackUIProvider>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});


