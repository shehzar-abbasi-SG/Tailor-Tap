import React from 'react'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import HomeScreen from '@/app/screens/App/Home/Home';
import ClientFormScreen from '@/app/screens/App/Home/ClientFormScreen';
import MeasurementScreen from '@/app/screens/App/Home/Measurements/Length';
import { HomeStackParamList } from '@/app/types/navigation';
import { ClientDetailFormProvider } from '@/app/context/FormContext';
import MeasurementNavigation from './MeasurementsNavigation';
import CongratulationScreen from '@/app/screens/App/Home/Congratulations';


const HomeStack = createStackNavigator();
type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'HomeMain'>;

interface IHomeNavigationProps {
    navigation: HomeScreenNavigationProp;
  }
function HomeNavigation({navigation}:IHomeNavigationProps) {
  return (
    <ClientDetailFormProvider>
        <HomeStack.Navigator>
            <HomeStack.Screen 
                name="HomeMain" 
                component={HomeScreen}
                options={{
                    headerShown:false
                }}
            />
            <HomeStack.Screen 
                name="ClientForm" 
                component={ClientFormScreen}
                options={{
                    headerShown:false
                }}
            />
            <HomeStack.Screen 
                name="Measurements" 
                component={MeasurementNavigation}
                options={{
                    headerShown:false
                }}
            />
            <HomeStack.Screen 
                name="Congratulations" 
                component={CongratulationScreen}
                options={{
                    headerShown:false
                }}
            />

        </HomeStack.Navigator>
    </ClientDetailFormProvider>
  )
}

export default HomeNavigation