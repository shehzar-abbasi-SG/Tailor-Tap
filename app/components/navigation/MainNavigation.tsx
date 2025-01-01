import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "@/app/screens/App/Home/Home";
import SearchScreen from "@/app/screens/App/Search/Search";
import SettingsScreen from "@/app/screens/App/Settings";
import ProfileScreen from "@/app/screens/App/Profile";
import { StyleSheet,View } from 'react-native';
import FoundationIcons from "react-native-vector-icons/Foundation";
import IonIcons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import OctIcons from "react-native-vector-icons/Octicons";
import HomeNavigation from './HomeNavigation';
import SearchNavigation from './SearchNavigation';

const MainStack = createBottomTabNavigator();

function MainNavigator() {
  return (
    <MainStack.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: "green", 
      tabBarInactiveTintColor: "white", 
      tabBarStyle: styles.tabBar, 
      tabBarShowLabel:false,
      tabBarIcon: ({ focused, color, size }) => {
        let IconElement;
        if (route.name === "HomeTab") {
          IconElement = <FoundationIcons name="home"  color={focused? '#000000':"#fff"} size={size}/>
        } else if (route.name === "Search") {
          IconElement= <AntDesign name="search1" color={focused? '#000000':"#fff"} size={size}/>
        } else if (route.name === "Settings") {
          IconElement= <IonIcons name="settings-sharp" color={focused? '#000000':"#fff"} size={size}/>
        } else if (route.name === "Profile") {
          IconElement= <OctIcons name="person" color={focused? '#000000':"#fff"} size={size}/>
        }
    
      
      return (
          <View className={`rounded-full ${focused?"bg-transparent border-[3px]":"bg-transparent"}`}> 
            <View className={`items-center justify-center w-[46px] h-[46px] rounded-full ${focused ?'bg-[#38D55B] mt-[-40px] elevation-[5]':'bg-transparent'}`}>
              {IconElement}
            </View>
          </View>
      )
    },
    
  })}
  >
    <MainStack.Screen name="HomeTab" component={HomeNavigation} />
    <MainStack.Screen name="Search" component={SearchNavigation} />
    <MainStack.Screen name="Settings" component={SettingsScreen} />
    <MainStack.Screen name="Profile" component={ProfileScreen} />
  </MainStack.Navigator>
  )
}

export default MainNavigator


const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#000",
    height: 80,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: "absolute",
    paddingTop:10
  },
  
});
