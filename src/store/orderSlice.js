import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",
  initialState: [],
  reducers: {
    setOrders: (state, action) => {
      return Array.isArray(action.payload) ? action.payload : [];
    },
    addOrder: (state, action) => {
      state.push(action.payload);
    },
    updateOrderStatus: (state, action) => {
      const { id, newStatus } = action.payload;
      const index = state.findIndex((order) => order.id === id);
      if (index !== -1) {
        state[index].status = newStatus;
      }
    },
    markAllAsPaid: (state) => {
      for (let orderArray of state) {
        for (let order of orderArray) {
          if (order.status === "new") {
            order.status = "paid";
          }
        }
      }
    },
    markAllAsDelivered: (state) => {
      for (let orderArray of state) {
        for (let order of orderArray) {
          if (order.status === "paid") {
            order.status = "delivered";
          }
        }
      }
    },
  },
});

export const {
  setOrders,
  addOrder,
  updateOrderStatus,
  markAllAsPaid,
  markAllAsDelivered,
} = ordersSlice.actions;
export default ordersSlice.reducer;
