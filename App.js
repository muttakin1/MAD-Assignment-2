import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Cart from "./src/Pages/Cart";
import HomeStack from "./src/Components/HomeStack";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false, // hides the header for tab screens
        }}
      >
        <Tab.Screen name="Categories" component={HomeStack} />
        <Tab.Screen name="Cart" component={Cart} />
        {/* <Tab.Screen name="MyOrders" component={MyOrders} />
        <Tab.Screen name="Profile" component={UserProfile} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
