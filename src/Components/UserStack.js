import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import UserProfile from "../Pages/UserProfile";

const Stack = createNativeStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
    </Stack.Navigator>
  );
}
