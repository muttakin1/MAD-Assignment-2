import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity } from "../store/cartSlice";
import { markAllAsPaid, markAllAsDelivered } from "../store/orderSlice";
import { checkAuthStatus,getOrderByUser } from "../api/Api";
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


const STATUS_LABELS = {
  new: "New Orders",
  paid: "Paid Orders",
  delivered: "Delivered Orders",
};

export default function MyOrders() {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  const [allOrders,setAllOrders]=useState()
  const [expanded, setExpanded] = useState({
    new: true,
    paid: false,
    delivered: false,
  });

   useFocusEffect(()  => {
    
    const getOrders= async()=>{
      const user = await checkAuthStatus()
      const response=await getOrderByUser(user.token)
      setAllOrders(response)
    }
    getOrders()

  }, [])
  
  const allItems = Array.isArray(orders[0]) ? orders.flat() : orders;

  const groupedItems = {
    new: allItems.filter((item) => item.status === "new"),
    paid: allItems.filter((item) => item.status === "paid"),
    delivered: allItems.filter((item) => item.status === "delivered"),
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
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
            extraData={orders}
          />
        )}

        {status === "new" && items.length > 0 && (
          <TouchableOpacity
            style={styles.payButton}
            onPress={() => {
              dispatch(markAllAsPaid());
              setExpanded((prev) => ({ ...prev, paid: true }));
            }}
          >
            <Text style={styles.payButtonText}>Mark All as Paid</Text>
          </TouchableOpacity>
        )}
        {status === "paid" && items.length > 0 && (
          <TouchableOpacity
            style={styles.payButton}
            onPress={() =>{ dispatch(markAllAsDelivered())
               setExpanded((prev) => ({ ...prev, paid: false,delivered:true }))
            }}
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
  deliverButton: {
    marginLeft: 10,
    backgroundColor: "#2196f3", // blue color, or any color you want
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  deliverButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});
