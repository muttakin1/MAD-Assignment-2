// src/hooks/useSyncCart.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCart } from "../store/cartSlice";
import { checkAuthStatus, getCartItems } from "../api/Api";

export default function useSyncCart() {
  const dispatch = useDispatch();

  useEffect(() => {
    const syncCart = async () => {
      const user = await checkAuthStatus();
      const token = user?.token;
      if (!token) return;

      const backendCart = await getCartItems(token);
      const items = backendCart?.items || [];

      const detailedItems = await Promise.all(
        items.map(async (item) => {
          try {
            const res = await fetch(
              `https://fakestoreapi.com/products/${item.id}`
            );
            const product = await res.json();
            return {
              id: item.id,
              price: item.price,
              quantity: item.quantity,
              title: product.title || "No Title",
              image: product.image || "",
            };
          } catch {
            return {
              id: item.id,
              price: item.price,
              quantity: item.quantity,
              title: "Unknown Product",
              image: "",
            };
          }
        })
      );

      dispatch(setCart(detailedItems));
    };

    syncCart();
  }, []);
}
