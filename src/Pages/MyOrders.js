import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { checkAuthStatus, getOrderByUser, updateOrder } from "../api/Api";
import { markAllAsPaid, markAllAsDelivered } from "../store/orderSlice";

const STATUS_LABELS = {
  new: "New Orders",
  paid: "Paid Orders",
  delivered: "Delivered Orders",
};

export default function MyOrders() {
  const dispatch = useDispatch();

  const handleMarkAllAsPaid = async () => {
    const user = await checkAuthStatus();

    const newOrders = groupedItems.new;
    console.log(newOrders);
    await Promise.all(
      newOrders.map((item) =>
        updateOrder(user.token, {
          orderID: item.orderId,
          isPaid: 1,
          isDelivered: 0,
        })
      )
    );
    dispatch(markAllAsPaid());
    setExpanded((prev) => ({ ...prev, paid: true,}));
    fetchOrders();
  };
  const handleMarkAllDelivered = async () => {
    const user = await checkAuthStatus();
    const paidOrders = groupedItems.paid;

    await Promise.all(
      paidOrders.map((item) =>
        updateOrder(user.token, {
          orderID: item.orderId,
          isPaid: 0,
          isDelivered: 1,
        })
      )
    );
    dispatch(markAllAsDelivered());
    setExpanded((prev) => ({ ...prev, paid: false, delivered: true }));
    fetchOrders();
  };

  const [groupedItems, setGroupedItems] = useState({
    new: [],
    paid: [],
    delivered: [],
  });

  const [expanded, setExpanded] = useState({
    new: true,
    paid: false,
    delivered: false,
  });

  const fetchOrders = async () => {
    const user = await checkAuthStatus();
    const response = await getOrderByUser(user.token);
    const orders = response.orders;

    // Flatten the structure and convert to UI-ready items
    const allItems = orders.flatMap((order) => {
      const status = order.is_delivered
        ? "delivered"
        : order.is_paid
          ? "paid"
          : "new";
      const items = JSON.parse(order.order_items);
      return items.map((item, index) => ({
        id: `${order.id}-${item.prodID}-${index}`, // unique key
        orderId: order.id,
        prodID: item.prodID,
        price: item.price,
        quantity: item.quantity,
        status,
        title: `Product #${item.prodID}`,
      }));
    });

    setGroupedItems({
      new: allItems.filter((i) => i.status === "new"),
      paid: allItems.filter((i) => i.status === "paid"),
      delivered: allItems.filter((i) => i.status === "delivered"),
    });
  };

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.price}>Price: ${item.price}</Text>
        <View style={styles.quantityRow}>
          <Text style={styles.quantityText}>Quantity: {item.quantity}</Text>
        </View>
      </View>
    </View>
  );

  const renderGroup = (status) => {
    const items = groupedItems[status];
    const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
    const total = items
      .reduce((sum, i) => sum + i.price * i.quantity, 0)
      .toFixed(2);

    return (
      <View style={styles.group} key={status}>
        <View style={styles.groupHeaderRow}>
          <TouchableOpacity
            style={styles.groupHeader}
            onPress={() =>
              setExpanded((prev) => ({ ...prev, [status]: !prev[status] }))
            }
          >
            <Text style={styles.groupTitle}>
              {STATUS_LABELS[status]}: {items.length}
            </Text>
            <Text style={styles.groupSummary}>
              Items: {itemCount} Total: ${total}
            </Text>
            <FontAwesome
              name={expanded[status] ? "angle-up" : "angle-down"}
              size={24}
            />
          </TouchableOpacity>
        </View>

        {expanded[status] && items.length > 0 && (
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        )}

        {status === "new" && items.length > 0 && (
          <TouchableOpacity
            style={styles.payButton}
            onPress={handleMarkAllAsPaid}
          >
            <Text style={styles.payButtonText}>Mark All as Paid</Text>
          </TouchableOpacity>
        )}
        {status === "paid" && items.length > 0 && (
          <TouchableOpacity
            style={styles.payButton}
            onPress={handleMarkAllDelivered}
          >
            <Text style={styles.payButtonText}>Mark All as Delivered</Text>
          </TouchableOpacity>
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
  groupHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  groupHeader: {
    flexDirection: "row",
    flex: 1,
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
  payButton: {
    marginLeft: 10,
    backgroundColor: "#4caf50",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 8,
    alignSelf: "flex-start",
  },
  payButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginVertical: 6,
    padding: 10,
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
    marginTop: 4,
  },
  quantityText: {
    fontSize: 14,
    marginHorizontal: 10,
  },
});
