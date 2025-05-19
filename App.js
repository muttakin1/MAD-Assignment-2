import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import store from "./src/store/store";
import ProtectedRoute from "./src/Components/ProtectedRoute";
import { useNavigation } from "@react-navigation/native";

import Cart from "./src/Pages/Cart";
import HomeStack from "./src/Components/HomeStack";
import UserStack from "./src/Components/UserStack";
import MyOrders from "./src/Pages/MyOrders";

import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";


const Tab = createBottomTabNavigator();

function AppTabs() {
  const navigation = useNavigation();
  const cartItems = useSelector((state) => state.cart);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const orders = useSelector((state) => state.orders);
  const newOrderCount = orders
    .flat()
    .filter((item) => item.status === "new")
    .reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const iconMap = {
            Cart: "shopping-cart",
            HomeStack: "home",
            "My Orders": "gift",
            "User Profile": "user",
          };
          const iconName = iconMap[route.name] || "circle";

          return (
            <View>
              <FontAwesome name={iconName} size={size} color={color} />
              {route.name === "Cart" && totalItems > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{totalItems}</Text>
                </View>
              )}
              {route.name === "My Orders" && newOrderCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{newOrderCount}</Text>
                </View>
              )}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="HomeStack" component={HomeStack} />

      <Tab.Screen
        name="Cart"
        children={() => (
          <ProtectedRoute navigation={navigation}>
            <Cart />
          </ProtectedRoute>
        )}
      />

      <Tab.Screen
        name="My Orders"
        children={() => (
          <ProtectedRoute navigation={navigation}>
            <MyOrders />
          </ProtectedRoute>
        )}
      />

      <Tab.Screen name="User Profile" component={UserStack} />
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
