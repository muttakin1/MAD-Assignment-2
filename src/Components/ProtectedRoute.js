import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

export default function ProtectedRoute({ children, navigation }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useFocusEffect(
    React.useCallback(() => {
      if (!isLoggedIn) {
        Alert.alert("Login Required", "Please sign in to access this page.");
        navigation.navigate("User Profile");
      }
    }, [isLoggedIn])
  );

  if (!isLoggedIn) return null; // Don't render the protected screen

  return children;
}
