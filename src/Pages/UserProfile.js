// src/Pages/UserProfile.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { checkAuthStatus, signout } from "../api/Api";
import { useDispatch } from "react-redux";
import { CommonActions,useFocusEffect } from "@react-navigation/native";
import { clearCart } from "../store/cartSlice";

export default function UserProfile({ route, navigation }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  const username = route.params?.name || user?.name;
  const email = route.params?.email || user?.email;

 useFocusEffect(
  React.useCallback(() => {
    const fetchAuthStatus = async () => {
      const response = await checkAuthStatus();
      setUser(response);
    };

    fetchAuthStatus();
  }, []) 
);

  const handleSignout = async () => {
    dispatch(clearCart());

    await signout(dispatch);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "SignIn" }],
      })
    );
  };

  const handleUpdateProfile = ()=>{
    navigation.navigate("UpdateProfile")
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header}>
        <Text style={styles.headerText}>User Profile</Text>
      </TouchableOpacity>

      <Text style={styles.label}>
        <Text style={styles.bold}>User Name: </Text>
        {username || "Not available"}
      </Text>
      <Text style={styles.label}>
        <Text style={styles.bold}>Email: </Text>
        {email || "Not available"}
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleUpdateProfile} style={styles.button}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSignout}
          style={[styles.button, { backgroundColor: "#0074cc" }]}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: "center",
    backgroundColor: "#f7f7f7",
  },
  header: {
    backgroundColor: "#3399ff",
    padding: 10,
    width: "90%",
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 30,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  bold: {
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 30,
    gap: 15,
  },
  button: {
    backgroundColor: "#0066cc",
    padding: 10,
    borderRadius: 6,
    width: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
  },
});
