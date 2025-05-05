import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity } from "../redux/cartSlice";
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

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleQuantityChange = (id, delta) => {
    dispatch(updateQuantity({ id, delta }));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.price}>Price: ${item.price}</Text>
        <View style={styles.quantityRow}>
          <TouchableOpacity onPress={() => handleQuantityChange(item.id, -1)}>
            <FontAwesome name="minus-circle" size={22} color="green" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>quantity: {item.quantity}</Text>
          <TouchableOpacity onPress={() => handleQuantityChange(item.id, 1)}>
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
      ) : (
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
    backgroundColor: "#e3f2fd",
    padding: 12,
    paddingTop: 60,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#1565c0",
  },
  emptyText: {
    fontSize: 30,
    color: "gray",
    textAlign: "center",
    marginTop: 180,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    borderRadius: 10,
    marginRight: 14,
    backgroundColor: "#f8f9fa",
  },
  details: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2e7d32",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  qtyButton: {
    backgroundColor: "#1565c0",
    padding: 6,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  qtyText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  summary: {
    position: "absolute",
    bottom: 70,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.50,
    shadowRadius: 2,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1565c0",
  },
  checkoutButton: {
    backgroundColor: "#0d47a1",
    padding: 16,
    borderRadius: 30,
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,
    alignItems: "center",
    elevation: 4,
  },
  checkoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
