import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./MainNavigation";
import AuthNavigator from "./AuthNavigation";
import { useAppContext } from "@/app/context/AppProvider";
import UpgradeNavigation from "./UpgradeNavigation";
import { AuthProvider } from "@/app/context/AuthContext";
import { UserProvider } from "@/app/context/UserContext";
import { CustomerProvider } from "@/app/context/CustomerContext";

type TNavigationProps={
}
export default function Navigation({}:TNavigationProps) {
  const {isAuthenticated,showUpgradeStack} = useAppContext()

  return (
    <NavigationContainer> 
      <AuthProvider>
        <UserProvider>
          <CustomerProvider>
            {isAuthenticated? showUpgradeStack?<UpgradeNavigation/>:<MainNavigator/>: <AuthNavigator/>}
          </CustomerProvider>
        </UserProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
