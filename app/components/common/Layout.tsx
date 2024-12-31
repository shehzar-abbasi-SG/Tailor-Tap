import React from 'react'
import { SafeAreaView,SafeAreaProvider } from "react-native-safe-area-context";
import { ScrollView } from 'react-native';
interface ILayoutProps{
    children:React.ReactNode,
    scrollable?:boolean
}
function Layout({children,scrollable=true}:ILayoutProps) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          {scrollable ? (
                <ScrollView 
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                >
                    {children}
                </ScrollView>
            ) : (
                children
            )}
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Layout