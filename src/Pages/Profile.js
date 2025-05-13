import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";


export default function Profile() {
 
    return (
      <View style={styles.container}>
       <Text>hello</Text>
      </View>
    );
  };

 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    backgroundColor: "#42a5f5",
    color: "#fff",
    paddingVertical: 10,
    borderRadius: 10,
  },
  group: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#90caf9",
    borderRadius: 10,
    padding: 5,
  },
  groupHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#bbdefb",
    padding: 10,
    borderRadius: 8,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0d47a1",
  },
  groupSummary: {
    fontSize: 14,
    color: "#333",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginVertical: 6,
    padding: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 10,
    resizeMode: "contain",
  },
  details: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: "#2e7d32",
    marginVertical: 2,
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 4,
  },
  quantityText: {
    fontSize: 14,
    marginHorizontal: 10,
  },
  receiveButton: {
    marginTop: 10,
    backgroundColor: "#1565c0",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  receiveText: {
    color: "white",
    fontWeight: "bold",
  },
});
