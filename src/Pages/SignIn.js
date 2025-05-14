import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { signin } from "../api/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    const response = await signin(email, password);
    if (response.token) {
      await storeData("user", response);
      navigation.navigate("UserProfile", {
        name: response.name,
        email: response.email,
      });
    }
  };
  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const handleClear = () => {
    setEmail("");
    setPassword("");
  };

  const handleSwitchToSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Sign in with email and password</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <FontAwesome name="circle-o" size={16} color="white" />
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <FontAwesome name="sign-in" size={16} color="white" />
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleSwitchToSignUp}>
          <Text style={styles.switchText}>Switch to: sign up a new user</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#5c6bc0",
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  label: {
    color: "white",
    marginTop: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 6,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1565c0",
    padding: 10,
    borderRadius: 20,
  },
  signInButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0d47a1",
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    marginLeft: 6,
    fontWeight: "bold",
  },
  switchText: {
    marginTop: 20,
    color: "white",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
