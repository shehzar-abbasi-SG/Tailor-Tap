import React from 'react'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import {MeasurementStackParamList } from '@/app/types/navigation';
import MeasurementScreenLength from '@/app/screens/App/Home/Measurements/Length';
import MeasurementScreenShoulder from '@/app/screens/App/Home/Measurements/Shoulder';
import MeasurementScreenArms from '@/app/screens/App/Home/Measurements/Arms';
import MeasurementScreenCuffs from '@/app/screens/App/Home/Measurements/Cuffs';
import MeasurementScreenCollar from '@/app/screens/App/Home/Measurements/Collar';
import MeasurementScreenChest from '@/app/screens/App/Home/Measurements/Chest';
import MeasurementScreenFitting from '@/app/screens/App/Home/Measurements/Fitting';
import MeasurementScreenLap from '@/app/screens/App/Home/Measurements/Lap';
import MeasurementScreenPant from '@/app/screens/App/Home/Measurements/Pant';
import MeasurementScreenPaincha from '@/app/screens/App/Home/Measurements/Paincha';
import MeasurementScreenAdditionalInfo from '@/app/screens/App/Home/Measurements/Additional_Info';


const MeasurementStack = createStackNavigator();
type MessurementScreenNavigation = StackNavigationProp<MeasurementStackParamList, 'Length'>;

interface IMeasurementScreenNavigationProps {
    navigation: MessurementScreenNavigation;
  }
function MeasurementNavigation({navigation}:IMeasurementScreenNavigationProps) {
  return (
        <MeasurementStack.Navigator>
            <MeasurementStack.Screen 
                name="Length" 
                component={MeasurementScreenLength}
                options={{
                    headerShown:false
                }}
            />
            <MeasurementStack.Screen 
                name="Shoulder" 
                component={MeasurementScreenShoulder}
                options={{
                    headerShown:false
                }}
            />
            <MeasurementStack.Screen 
                name="Arms" 
                component={MeasurementScreenArms}
                options={{
                    headerShown:false
                }}
            />
            <MeasurementStack.Screen 
                name="Cuffs" 
                component={MeasurementScreenCuffs}
                options={{
                    headerShown:false
                }}
            />
             <MeasurementStack.Screen 
                name="Collar" 
                component={MeasurementScreenCollar}
                options={{
                    headerShown:false
                }}
            />
             <MeasurementStack.Screen 
                name="Chest" 
                component={MeasurementScreenChest}
                options={{
                    headerShown:false
                }}
            />
             <MeasurementStack.Screen 
                name="Fitting" 
                component={MeasurementScreenFitting}
                options={{
                    headerShown:false
                }}
            />
             <MeasurementStack.Screen 
                name="Lap" 
                component={MeasurementScreenLap}
                options={{
                    headerShown:false
                }}
            />
             <MeasurementStack.Screen 
                name="Pant" 
                component={MeasurementScreenPant}
                options={{
                    headerShown:false
                }}
            />
            <MeasurementStack.Screen 
                name="Paincha" 
                component={MeasurementScreenPaincha}
                options={{
                    headerShown:false
                }}
            />
            <MeasurementStack.Screen 
                name="AdditionalDetail" 
                component={MeasurementScreenAdditionalInfo}
                options={{
                    headerShown:false
                }}
            />
        </MeasurementStack.Navigator>
  )
}

export default MeasurementNavigation