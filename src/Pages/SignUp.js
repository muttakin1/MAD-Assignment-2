import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function Profile() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleConfirm = () => {
    // Handle profile update logic
    alert(`Updated: ${username}`);
  };

  const handleCancel = () => {
    setUsername("");
    setPassword("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>New User Name</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter new username"
        />

        <Text style={styles.label}>New Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter new password"
          secureTextEntry
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <FontAwesome name="check" size={18} color="white" />
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <FontAwesome name="times" size={18} color="white" />
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: "#2196f3",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#5c6bc0",
    borderRadius: 10,
    padding: 16,
  },
  label: {
    color: "white",
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 6,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  confirmButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0d47a1",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  cancelButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e88e5",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    marginLeft: 8,
    fontWeight: "bold",
  },
});
