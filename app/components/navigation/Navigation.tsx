import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./MainNavigation";
import AuthNavigator from "./AuthNavigation";
import { useAppContext } from "@/app/context/AppProvider";
import UpgradeNavigation from "./UpgradeNavigation";

type TNavigationProps={
}
export default function Navigation({}:TNavigationProps) {
  const {isAuthenticated,showUpgradeStack} = useAppContext()
  return (
    <NavigationContainer> 
      {isAuthenticated? showUpgradeStack?<UpgradeNavigation/>:<MainNavigator/>: <AuthNavigator/>}
    </NavigationContainer>
  );
}
