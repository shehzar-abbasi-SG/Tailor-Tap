import React from 'react'
import { SafeAreaView,SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
interface ILayoutProps{
    children:React.ReactNode,
    scrollable?:boolean
    isKeyboardAvoidingView?:boolean
}
function Layout({children,scrollable=true,isKeyboardAvoidingView=false}:ILayoutProps) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          {scrollable ? (
            <>
              {isKeyboardAvoidingView?
                <KeyboardAvoidingView
                  style={{ flex: 1 }}
                  behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
                  keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 50}
                >

                  <ScrollView 
                      contentContainerStyle={{ flexGrow: 1,paddingBottom:50 }}
                      showsVerticalScrollIndicator={false}
                  >
                    {children}
                  </ScrollView>
                </KeyboardAvoidingView>
                
                :
                <ScrollView 
                  contentContainerStyle={{ flexGrow: 1,paddingBottom:50 }}
                  showsVerticalScrollIndicator={false}
                > 
                  {children}
                </ScrollView>
              }
              </>  
            ) : (
                children
            )}
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Layout