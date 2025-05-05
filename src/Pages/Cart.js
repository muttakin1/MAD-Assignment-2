import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function Cart({ cartItems, setCartItems }) {
  const updateQuantity = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.price}>Price: ${item.price}</Text>
        <View style={styles.quantityRow}>
          <TouchableOpacity onPress={() => updateQuantity(item.id, -1)}>
            <FontAwesome name="minus-circle" size={22} color="green" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>quantity: {item.quantity}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
            <FontAwesome name="plus-circle" size={22} color="green" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shopping Cart</Text>

      <View style={styles.summary}>
        <Text style={styles.summaryText}>Items: {totalItems}</Text>
        <Text style={styles.summaryText}>Total Price: ${totalPrice}</Text>
      </View>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your shopping cart is empty.</Text>
      ):(

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 80 }}
        
      />
    )}
      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => Alert.alert("Checkout", "Proceeding to checkout...")}
      >
        <Text style={styles.checkoutText}>Check Out</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 10,
    paddingTop:60
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 10,
    color: "#2196f3",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#e3f2fd",
    borderRadius: 8,
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1565c0",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: "#444",
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 6,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: "bold",
    marginHorizontal: 8,
  },
  checkoutButton: {
    backgroundColor: "#1976d2",
    padding: 14,
    borderRadius: 25,
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyText: {
    fontSize: 30,
    color: "gray",
    textAlign: "center",
    marginTop: 50,
  },
});
