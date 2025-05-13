// src/Pages/UserProfile.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function UserProfile({ navigation }) {
  const username = "tom";
  const email = "test@test.com";

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header}>
        <Text style={styles.headerText}>User Profile</Text>
      </TouchableOpacity>

      <Text style={styles.label}>
        <Text style={styles.bold}>User Name: </Text>{username}
      </Text>
      <Text style={styles.label}>
        <Text style={styles.bold}>Email: </Text>{email}
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: "#0074cc" }]}>
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
