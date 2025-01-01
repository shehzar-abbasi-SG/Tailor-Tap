import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Layout from "@/app/components/common/Layout";
import Header from "@/app/components/common/Header";
import Button from "@/app/components/common/Button";
import { ScrollView } from 'react-native';
import { Input, InputField } from "@/app/components/ui/input";
import AntDesignIcon from "@expo/vector-icons/AntDesign"
import { StackNavigationProp } from "@react-navigation/stack";
import { SearchStackParamList } from "@/app/types/navigation";

const persons = [
  {name:"Person's Name",phone:"0334 567 7890",},
  {name:"Person's Name",phone:"0334 567 7890",},
  {name:"Person's Name",phone:"0334 567 7890",},
  {name:"Person's Name",phone:"0334 567 7890",},
  {name:"Person's Name",phone:"0334 567 7890",},
  {name:"Person's Name",phone:"0334 567 7890",},
  {name:"Person's Name",phone:"0334 567 7890",}
]

type SearchScreenNavigationProp = StackNavigationProp<SearchStackParamList>;

interface ISearchNavigationProps {
    navigation: SearchScreenNavigationProp;
  }
const SearchScreen = ({navigation}:ISearchNavigationProps) => {
  const [query,setQuery] = useState("")
  return (
    <Layout scrollable={false}>
        <Header onBackPress={()=>{}}/>
        <View style={styles.container} className="px-10 pt-[30px]">
          <Input
              variant="outline"
              size="md"
              className="bg-[#EAEAEA] px-[20px] rounded-full w-full h-[60px] focus:outline-none focus-within:ring-0 focus:border-transparent focus:ring-0"
            >
              <AntDesignIcon name="search1" size={20} color={"#000"}/>
              <InputField
                placeholder="Enter a Name"
                value={query}
                onChangeText={(text)=>setQuery(text)}
                className="text-base placeholder:text-[##585858] placeholder:text-[16px] placeholder:font-normal placeholder:font-[PoppinsRegular] placeholder:leading-[24px]"
              />
          </Input>
           <ScrollView 
              contentContainerStyle={{ flexGrow: 1,paddingTop:48 }}
              showsVerticalScrollIndicator={false}
            >
            {persons.map((person,index)=>(
              <View key={index} className="flex flex-row justify-between items-center w-full border-b border-[#DCDCDC] py-[18px]">
                <View className="flex flex-col gap-y-1">
                  <Text>{person.name}</Text>
                  <Text>{person.phone}</Text>
                </View>
                <Button onPress={()=>{navigation.navigate("EditDetail")}} title="Edit" className="mt-0 h-[39px] rounded-[6px]" 
                buttonTextStyles="text-[17px] leading-[25.5px] normal-case p-0 font-bold font-[PoppinsBold]"  />
              </View>
            ))}
          </ScrollView>
        </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
  },
});

export default SearchScreen;
