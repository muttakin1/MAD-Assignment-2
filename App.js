import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import Cart from "./src/Pages/Cart";
import HomeStack from "./src/Components/HomeStack";

const Tab = createBottomTabNavigator();

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const totalCartQuantity = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            if (route.name === "Cart") {
              return (
                <View>
                  <FontAwesome name="shopping-cart" size={size} color={color} />
                  {totalCartQuantity > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>
                        {totalCartQuantity}
                      </Text>
                    </View>
                  )}
                </View>
              );
            } else if (route.name === "Home") {
              return <FontAwesome name="home" size={size} color={color} />;
            }
          },
        })}
      >
        <Tab.Screen name="Home">
          {() => <HomeStack addToCart={addToCart} />}
        </Tab.Screen>
        <Tab.Screen name="Cart">
          {() => (
            <Cart cartItems={cartItems} setCartItems={setCartItems} />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
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
