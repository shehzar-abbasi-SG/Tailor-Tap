import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./MainNavigation";
import AuthNavigator from "./AuthNavigation";


// const linking = {
//   prefixes: ['yourapp://'],
//   config: {
//     screens: {
//       Home: {
//         screens: {
//           HomeMain: 'home',
//           ClientDetails: 'home/client-details',
//           Measurement: 'home/measurement',
//         },
//       },
//       Search: {
//         screens: 'Search'
//       },
//       Search: {
//         screens: 'Search'
//       },
//     },
//   },
// };

type TNavigationProps={
  isAuthenticated:boolean
}
export default function Navigation({isAuthenticated}:TNavigationProps) {

  return (
    <NavigationContainer > 
      {isAuthenticated? <MainNavigator/>: <AuthNavigator/>}
    </NavigationContainer>
  );
}
