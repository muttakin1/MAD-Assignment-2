import React, {useEffect} from "react";
import { Text, View, StyleSheet, Button,Alert, FlatList, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from 'react-native-splash-screen'
import HomePage from "./src/Pages/HomePage";
import CategoryProducts from './src/Pages/CategoryProducts'
// import NewTask from "./src/NewTask";

const Stack = createStackNavigator();

const App = () => {

  useEffect(() => {
    if (SplashScreen) {
      SplashScreen.hide();
      }
  }, [])
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Categories">
        <Stack.Screen name="Categories" component={HomePage} style={styles.item}/>
        <Stack.Screen name="CategoryProducts" component={CategoryProducts} style={styles.item}/>
   
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    text: {
      fontSize: 24,
      fontWeight: "bold",
    },
     item: {
      backgroundColor: '#1111',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });
  
export default App;
