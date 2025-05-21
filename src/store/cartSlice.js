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
      const item = state.find((i) => i.id === id);
      if (item) {
        const newQty = item.quantity + delta;
        if (newQty <= 0) {
          return state.filter((i) => i.id !== id); // remove item if qty goes to 0
        }
        item.quantity = newQty;
      }
    },
    setCart: (_, action) => {
      return action.payload;
    },
    clearCart: () => [],
  },
});

export const { addToCart, updateQuantity, setCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
