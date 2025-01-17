import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '@/app/screens/App/Profile/Profile';
import EditProfileScreen from '@/app/screens/App/Profile/EditProfile';



const ProfileStack = createStackNavigator();
interface IProfileNavigationProps {
}

function ProfileNavigation({}:IProfileNavigationProps) {
    return (
        <ProfileStack.Navigator 
            screenOptions={{
                headerShown:false,
                animation:'slide_from_right',
                gestureEnabled:true
            }}
        >
            <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
            <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
        </ProfileStack.Navigator>
    )
}

export default ProfileNavigation