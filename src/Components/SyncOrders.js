import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOrderByUser } from "../api/Api"; // adjust if needed
import { setOrders } from "../store/orderSlice";

export default function useSyncOrders() {
  const dispatch = useDispatch();

  useEffect(() => {
     console.log("Fetching orders...");
    const fetchOrders = async () => {
      try {
        const orders = await getOrderByUser(); // fetch from backend
        console.log("Orders fetched from API:", orders); 
        dispatch(setOrders(orders));
      } catch (err) {
        console.error("Failed to sync orders", err);
      }
    };

    fetchOrders();
  }, [dispatch]);
}
