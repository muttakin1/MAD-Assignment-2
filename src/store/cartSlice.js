// src/redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const item = state.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    updateQuantity: (state, action) => {
      const { id, delta } = action.payload;
      const index = state.findIndex((item) => item.id === id);
      if (index !== -1) {
        state[index].quantity += delta;
        if (state[index].quantity <= 0) {
          state.splice(index, 1);
        }
      }
    },
    clearCart: () => [],
    checkoutCart: (state) => {
      const paidItems = state
        .filter((item) => item.status === "new")
        .map((item) => ({ ...item, status: "paid" }));

      const remainingItems = state.filter((item) => item.status !== "new");

      return [...remainingItems, ...paidItems];
    },
  },
});

export const { addToCart, updateQuantity, clearCart, checkoutCart } =
  cartSlice.actions;
export default cartSlice.reducer;
