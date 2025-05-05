import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "../Pages/HomePage";
import CategoryProducts from "../Pages/CategoryProducts";
import ProductDetail from "../Pages/ProductDetails";

const Stack = createStackNavigator();

export default function HomeStack({ addToCart }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="CategoryProducts" component={CategoryProducts} />
      <Stack.Screen name="ProductDetail">
        {(props) => <ProductDetail {...props} addToCart={addToCart} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
