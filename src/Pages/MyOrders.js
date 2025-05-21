import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
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
  const [groupedOrders, setGroupedOrders] = useState({
    new: [],
    paid: [],
    delivered: [],
  });

  const [expanded, setExpanded] = useState({
    new: true,
    paid: false,
    delivered: false,
  });

  const [orderExpanded, setOrderExpanded] = useState({});
  const [orderDetails, setOrderDetails] = useState({});

  const fetchOrders = async () => {
    const user = await checkAuthStatus();
    const response = await getOrderByUser(user.token);
    const orders = response.orders || [];

    const grouped = { new: [], paid: [], delivered: [] };

    orders.forEach((order) => {
      const status = order.is_delivered
        ? "delivered"
        : order.is_paid
          ? "paid"
          : "new";

      const items = JSON.parse(order.order_items);
      grouped[status].push({
        id: order.id,
        items,
        total_price: order.total_price,
      });
    });

    setGroupedOrders(grouped);
  };

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [])
  );

  const handleMarkAllAsPaid = async () => {
    const user = await checkAuthStatus();
    await Promise.all(
      groupedOrders.new.map((order) =>
        updateOrder(user.token, {
          orderID: order.id,
          isPaid: 1,
          isDelivered: 0,
        })
      )
    );
    dispatch(markAllAsPaid());
    setExpanded((prev) => ({ ...prev, paid: true }));
    fetchOrders();
  };

  const handleMarkAllDelivered = async () => {
    const user = await checkAuthStatus();
    await Promise.all(
      groupedOrders.paid.map((order) =>
        updateOrder(user.token, {
          orderID: order.id,
          isPaid: 0,
          isDelivered: 1,
        })
      )
    );
    dispatch(markAllAsDelivered());
    setExpanded((prev) => ({ ...prev, paid: false, delivered: true }));
    fetchOrders();
  };

  const renderOrderItem = ({ item }) => {
    const product = item.productInfo;

    return (
      <View style={styles.itemCard}>
      {product ? (
        <View style={styles.itemRow}>
          <Image source={{ uri: product.image }} style={styles.image} />

          <View style={styles.itemDetails}>
            <Text style={styles.titleText} numberOfLines={2}>
              {product.title}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.boldText}>Price:</Text> ${item.price}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.boldText}>Quantity:</Text> {item.quantity}
            </Text>
          </View>
        </View>
      ) : (
        <Text style={styles.itemText}>Loading product info...</Text>
      )}
    </View>
    );
  };

  const renderOrderCard = (order) => {
    const isOpen = orderExpanded[order.id];
    const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
    const total = (order.total_price / 100).toFixed(2);

    return (
      <View key={order.id} style={styles.orderCard}>
        <TouchableOpacity
          style={styles.orderHeader}
          onPress={async () => {
            const isNowOpen = !orderExpanded[order.id];

            setOrderExpanded((prev) => ({
              ...prev,
              [order.id]: isNowOpen,
            }));

            if (isNowOpen && !orderDetails[order.id]) {
              const fetchedItems = await Promise.all(
                order.items.map(async (item) => {
                  try {
                    const res = await fetch(
                      `https://fakestoreapi.com/products/${item.prodID}`
                    );
                    const data = await res.json();
                    return { ...item, productInfo: data };
                  } catch (err) {
                    console.error("Error fetching product:", item.prodID, err);
                    return { ...item, productInfo: null };
                  }
                })
              );

              setOrderDetails((prev) => ({
                ...prev,
                [order.id]: fetchedItems,
              }));
            }
          }}
        >
          <View>
            <Text style={styles.orderId}>Order ID: {order.id}</Text>
            <Text style={styles.orderSummary}>
              Items: {itemCount} | Total: ${total}
            </Text>
          </View>
          <FontAwesome name={isOpen ? "angle-up" : "angle-down"} size={20} />
        </TouchableOpacity>

        {isOpen && (
          <FlatList
            data={orderDetails[order.id] || []}
            keyExtractor={(item, idx) => `${order.id}-${item.prodID}-${idx}`}
            renderItem={renderOrderItem}
          />
        )}
      </View>
    );
  };

  const renderGroup = (status) => {
    const orders = groupedOrders[status];

    return (
      <View style={styles.group} key={status}>
        <TouchableOpacity
          style={styles.groupHeader}
          onPress={() =>
            setExpanded((prev) => ({ ...prev, [status]: !prev[status] }))
          }
        >
          <Text style={styles.groupTitle}>
            {STATUS_LABELS[status]}: {orders.length}
          </Text>
          <FontAwesome
            name={expanded[status] ? "chevron-up" : "chevron-down"}
            size={18}
          />
        </TouchableOpacity>

        {expanded[status] && (
          <>
            {orders.map(renderOrderCard)}

            {status === "new" && orders.length > 0 && (
              <TouchableOpacity
                style={styles.payButton}
                onPress={handleMarkAllAsPaid}
              >
                <Text style={styles.payButtonText}>Mark All as Paid</Text>
              </TouchableOpacity>
            )}
            {status === "paid" && orders.length > 0 && (
              <TouchableOpacity
                style={styles.payButton}
                onPress={handleMarkAllDelivered}
              >
                <Text style={styles.payButtonText}>Mark All as Delivered</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>My Orders</Text>
      {["new", "paid", "delivered"].map(renderGroup)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
    backgroundColor: "#f0f0f0",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    backgroundColor: "#42a5f5",
    color: "#fff",
    paddingVertical: 12,
    borderRadius: 10,
  },
  group: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#90caf9",
    borderRadius: 10,
    backgroundColor: "#e3f2fd",
    paddingBottom: 10,
  },
  groupHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#bbdefb",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0d47a1",
  },
  orderCard: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    borderRadius: 8,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderId: {
    fontWeight: "bold",
    fontSize: 14,
  },
  orderSummary: {
    fontSize: 13,
    color: "#555",
    marginTop: 2,
  },
  itemCard: {
    backgroundColor: "#f9f9f9",
    padding: 8,
    marginTop: 6,
    borderRadius: 6,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  itemText: {
    fontSize: 13,
  },
  payButton: {
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: "#4caf50",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  payButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  image: {
    width: 80,
  height: 80,
  resizeMode: "contain",
  borderRadius: 6,
  marginRight: 10,
  backgroundColor: "#fff",
  },
  itemRow: {
  flexDirection: "row",
  alignItems: "center",
},

itemDetails: {
  flex: 1,
  flexDirection: "column",
  justifyContent: "space-between",
},

titleText: {
  fontSize: 13,
  fontWeight: "bold",
  marginBottom: 6,
  color: "#333",
},

detailText: {
  fontSize: 12,
  marginBottom: 2,
},

boldText: {
  fontWeight: "bold",
},
});
