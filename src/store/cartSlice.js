// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      
      const item = state.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1, status: 'new' });

      }
    },
    updateQuantity: (state, action) => {
      const { id, delta } = action.payload;
      const index = state.findIndex(item => item.id === id);
      if (index !== -1) {
        state[index].quantity += delta;
        if (state[index].quantity <= 0) {
          state.splice(index, 1); 
        }
      }
    },
    clearCart: () => [],
  },
});

export const { addToCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
