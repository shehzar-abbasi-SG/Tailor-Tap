import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ChoosePlan from '@/app/screens/App/Upgrade/ChoosePlan';
import ChooseAccount from '@/app/screens/App/Upgrade/ChooseAccount';
import AccountInformation from '@/app/screens/App/Upgrade/AccountInfo';
import CongratulationScreen from '@/app/screens/App/Upgrade/Congratulations';
import { UpgradePlanFormProvider } from '@/app/context/UpgradePlanFormContext';



const UpgradeStack = createStackNavigator();
interface IUpgradeNavigationProps {
  }


function UpgradeNavigation({}:IUpgradeNavigationProps) {
    return (
         <UpgradePlanFormProvider>
            <UpgradeStack.Navigator 
                screenOptions={{
                    headerShown:false,
                    animation:'slide_from_right',
                    gestureEnabled:true
                }}
            >
                <UpgradeStack.Screen name="Plan" component={ChoosePlan} />
                <UpgradeStack.Screen name="Account" component={ChooseAccount} />
                <UpgradeStack.Screen name="AccountInfo" component={AccountInformation} />
                <UpgradeStack.Screen name="Congratulations" component={CongratulationScreen} />
            </UpgradeStack.Navigator>
        </UpgradePlanFormProvider>
    )
}

export default UpgradeNavigation