import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import store from "./src/store/store";

import Cart from "./src/Pages/Cart";
import HomeStack from "./src/Components/HomeStack";
import Profile from "./src/Pages/Profile"
import MyOrders from "./src/Pages/MyOrders"
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

function AppTabs() {
  const cartItems = useSelector((state) => state.cart);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Cart") {
            return (
              <View>
                <FontAwesome name="shopping-cart" size={size} color={color} />
                {totalItems > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{totalItems}</Text>
                  </View>
                )}
              </View>
            );
          } else if (route.name === "Home") {
            return <FontAwesome name="home" size={size} color={color} />;
          }
          else if (route.name === "My Orders") {
            return <FontAwesome name="gift" size={size} color={color} />;
          }
          else if (route.name === "Profile") {
            return <FontAwesome name="user" size={size} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="My Orders" component={MyOrders} />
      <Tab.Screen name="Profile" component={Profile} />
      
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppTabs />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    right: -6,
    top: -3,
    backgroundColor: "red",
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});
