import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsScreen from "@/app/screens/App/Settings";
import { Dimensions, StyleSheet,View } from 'react-native';
import FoundationIcons from "@expo/vector-icons/Foundation";
import IonIcons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import OctIcons from "@expo/vector-icons/Octicons";
import HomeNavigation from './HomeNavigation';
import SearchNavigation from './SearchNavigation';
import ProfileNavigation from './ProfileNavigation';

const MainStack = createBottomTabNavigator();

function MainNavigator() {
  const {width,height} = Dimensions.get("window")
  return (
    <View style={{
      width,
      height
    }}>
      <MainStack.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "green", 
          tabBarInactiveTintColor: "white", 
          tabBarStyle: styles.tabBar, 
          tabBarShowLabel:false,
          tabBarHideOnKeyboard: true,
          animation:'shift',
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
      <MainStack.Screen name="Profile" component={ProfileNavigation} />
      </MainStack.Navigator>
  </View>
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
