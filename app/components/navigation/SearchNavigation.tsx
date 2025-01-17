import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ChoosePlan from '@/app/screens/App/Upgrade/ChoosePlan';
import ChooseAccount from '@/app/screens/App/Upgrade/ChooseAccount';
import AccountInformation from '@/app/screens/App/Upgrade/AccountInfo';
import CongratulationScreen from '@/app/screens/App/Upgrade/Congratulations';
import { UpgradePlanFormProvider } from '@/app/context/UpgradePlanFormContext';
import { AppProvider } from '@/app/context/AppProvider';
import SearchScreen from '@/app/screens/App/Search/Search';
import EditDetail from '@/app/screens/App/Search/EditDetail';
import { ClientDetailFormProvider } from '@/app/context/FormContext';
import EditPhotos from '@/app/screens/App/Search/EditPhotos';



const SearchStack = createStackNavigator();
interface ISearchNavigationProps {
  }


function SearchNavigation({}:ISearchNavigationProps) {
    return (
         <ClientDetailFormProvider>
            <SearchStack.Navigator 
                screenOptions={{
                    headerShown:false,
                    animation:'slide_from_right',
                    gestureEnabled:true
                }}
            >
                <SearchStack.Screen name="SearchMain" component={SearchScreen} />
                <SearchStack.Screen name="EditDetail" component={EditDetail} />
                <SearchStack.Screen name="EditPhotos" component={EditPhotos} />
                {/* <SearchStack.Screen name="Congratulations" component={CongratulationScreen} /> */}
            </SearchStack.Navigator>
        </ClientDetailFormProvider>
    )
}

export default SearchNavigation