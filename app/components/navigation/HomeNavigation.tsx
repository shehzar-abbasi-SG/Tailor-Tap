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
        <HomeStack.Navigator
        screenOptions={{
            headerShown:false,
            animation:'slide_from_right',
            gestureEnabled:true
        }}
        >
            <HomeStack.Screen 
                name="HomeMain" 
                component={HomeScreen}

            />
            <HomeStack.Screen 
                name="ClientForm" 
                component={ClientFormScreen}
            />
            <HomeStack.Screen 
                name="Measurements" 
                component={MeasurementNavigation}
            />
            <HomeStack.Screen 
                name="Congratulations" 
                component={CongratulationScreen}
            />

        </HomeStack.Navigator>
    </ClientDetailFormProvider>
  )
}

export default HomeNavigation