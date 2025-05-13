import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity } from "../store/cartSlice";
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

const STATUS_LABELS = {
  new: "New Orders",
  paid: "Paid Orders",
  delivered: "Delivered Orders",
};

export default function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState({
    new: true,
    paid: false,
    delivered: false,
  });

  const groupedItems = {
    new: cartItems.filter((item) => item.status === "new"),
    paid: cartItems.filter((item) => item.status === "paid"),
    delivered: cartItems.filter((item) => item.status === "delivered"),
  };

  const handleQuantityChange = (id, delta) => {
    dispatch(updateQuantity({ id, delta }));
  };

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
          <Text style={styles.quantityText}>Quantity: {item.quantity}</Text>
          <TouchableOpacity onPress={() => handleQuantityChange(item.id, 1)}>
            <FontAwesome name="plus-circle" size={22} color="green" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderGroup = (status) => {
    const items = groupedItems[status];
    const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2);

    return (
      <View style={styles.group}>
        <TouchableOpacity
          style={styles.groupHeader}
          onPress={() => setExpanded((prev) => ({ ...prev, [status]: !prev[status] }))}
        >
          <Text style={styles.groupTitle}>
            {STATUS_LABELS[status]}: {items.length > 0 ? `1` : `0`}
          </Text>
          <Text style={styles.groupSummary}>Items: {itemCount}  Total: ${total}</Text>
          <FontAwesome name={expanded[status] ? "angle-up" : "angle-down"} size={24} />
        </TouchableOpacity>
        {expanded[status] && items.length > 0 && (
          <FlatList
            data={items}
            key={items.id}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Orders</Text>
      {["new", "paid", "delivered"].map(renderGroup)}
    </View>
  );
}

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
});
