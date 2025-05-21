import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { syncCartItem, checkAuthStatus } from "../api/Api";

export default function ProductDetail({ route, navigation }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleAddToCart = async () => {
  // Optimistically update Redux
  dispatch(addToCart(product));

  // Build updated cart manually
  const updatedCart = [...cart];
  const index = updatedCart.findIndex((item) => item.id === product.id);

  if (index > -1) {
    // Already exists in cart — increment quantity
    const updatedItem = { ...updatedCart[index] };
    updatedItem.quantity += 1;
    updatedCart[index] = updatedItem;
  } else {
    // Not in cart yet
    updatedCart.push({ ...product, quantity: 1 });
  }

  const payload = {
    items: updatedCart.map((item) => ({
      id: item.id,
      price: item.price,
      quantity: item.quantity,
    })),
  };

  try {
    const user = await checkAuthStatus();
    const token = user?.token;

    if (!token) {
      console.log("User not logged in, cannot sync with backend");
      return;
    }

    console.log("Syncing cart:", JSON.stringify(payload, null, 2));
    await syncCartItem(token, payload);
    console.log("Cart synced successfully.");
  } catch (err) {
    console.error("Error syncing cart:", err);
  }
};


  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.title}>{product.title}</Text>
      <View style={styles.productInfoCard}>
        <Text style={styles.infoText}>Rate: {product.rating?.rate}</Text>
        <Text style={styles.infoText}>Count: {product.rating?.count}</Text>
        <Text style={styles.infoText}>Price: ${product.price}</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="arrow-left" size={16} color="#fff" />
          <Text style={styles.buttonText}> Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
          <FontAwesome name="cart-plus" size={16} color="#fff" />
          <Text style={styles.buttonText}> Add to Cart</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.descriptionLabel}>Description:</Text>
      <View style={styles.descriptionBox}>
        <Text style={styles.descriptionText}>{product.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginVertical: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  productInfoCard: {
    backgroundColor: "#e0f7fa",
    borderRadius: 8,
    padding: 12,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  infoText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1976d2",
    padding: 10,
    borderRadius: 25,
    paddingHorizontal: 20,
  },
  cartButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e88e5",
    padding: 10,
    borderRadius: 25,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 6,
  },
  descriptionLabel: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  descriptionBox: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    width: "100%",
  },
  descriptionText: {
    fontSize: 14,
    color: "#333",
    textAlign: "justify",
  },
});
